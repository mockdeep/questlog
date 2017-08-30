class Task < ApplicationRecord

  before_create :assign_position

  # counter-acts the automatic decrement from counter_cache
  before_destroy :increment_counters, if: :done?

  belongs_to :user, counter_cache: :unfinished_tasks_count

  has_many :taggings, dependent: :destroy, inverse_of: :task
  has_many :tags, through: :taggings

  validates :priority, inclusion: { in: [1, 2, 3] }, allow_nil: true
  validates :timeframe, inclusion: { in: Timeframe::NAMES }, allow_nil: true
  validates :title, :user, presence: true
  validates(
    :repeat_string,
    inclusion: { in: Repeat.repeat_maps.keys },
    allow_nil: true,
  )

  scope :undone, -> { where(done_at: nil) }
  scope :done, -> { where.not(done_at: nil) }
  scope :ordered, -> { order(:priority, :position) }
  scope :ready_to_release, -> { done.where('release_at < ?', Time.zone.now) }
  scope :untagged, lambda {
    joins('LEFT OUTER JOIN "taggings" ON "taggings"."task_id" = "tasks"."id"')
      .where(taggings: { id: nil })
  }
  scope :with_release, -> { where.not(release_at: nil) }
  scope :pending, -> { done.with_release.order(:release_at) }
  scope :without_estimate, -> { undone.where(estimate_seconds: nil) }

  attr_reader :postpone
  attr_writer :tag_names

  after_save :associate_tags, :update_counters

  def self.reposition(ids)
    return unless ids.any?
    raise ActiveRecord::RecordNotFound unless (ids - pluck(:id)) == []
    where(id: ids).update_all(['position = idx(array[?], id::int)', ids])
  end

  def self.next
    undone.ordered.find_by(timeframe: next_timeframe)
  end

  def self.next_timeframe
    (Timeframe::NAMES & undone.distinct(:timeframe).pluck(:timeframe)).first
  end

  def done=(done)
    persisted? ? with_lock { mark_done(done) } : mark_done(done)
  end

  def mark_done(done)
    self.done_at = ['true', true].include?(done) ? Time.zone.now : nil
    self.release_at = nil
    if done_at?
      self.release_at = Time.zone.now + repeat_seconds if repeat_seconds
      self.skip_count = 0
      @decrement_counters = true if changed_to_done?
    elsif changed_to_not_done?
      @increment_counters = true
    end
  end

  def changed_to_done?
    done_at && !done_at_was
  end

  def changed_to_not_done?
    !done_at && done_at_was
  end

  def postpone=(postpone_seconds)
    self.skip_count += 1
    self.release_at = Integer(postpone_seconds).seconds.from_now
  end

  def repeat?
    repeat_seconds.present?
  end

  def release!
    update!(done: false, position: next_position)
  end

  def done?
    done_at?
  end

  def repeat_string=(new_repeat_string)
    new_repeat_string = nil if new_repeat_string.blank?
    super(new_repeat_string)
  end

  def release_at=(new_release_at)
    super

    return unless new_release_at && !done_at_changed?

    self.done_at = Time.zone.now
    @decrement_counters = true if changed_to_done?
  end

  def tag_names
    @tag_names ||= tags.map(&:name)
  end

private

  def next_position
    user.tasks.undone.maximum(:position).to_i + 1
  end

  def increment_counters
    tags.each(&:increment_tasks_count!)
    User.increment_counter(:unfinished_tasks_count, user.id)
  end

  def decrement_counters
    tags.each(&:decrement_tasks_count!)
    User.decrement_counter(:unfinished_tasks_count, user.id)
  end

  def associate_tags
    return unless @tag_names
    self.tags = Tag.find_or_create_all(user: user, names: @tag_names)
  end

  def update_counters
    if @decrement_counters
      decrement_counters
      @decrement_counters = nil
    elsif @increment_counters
      increment_counters
      @increment_counters = nil
    end
  end

  def assign_position
    self.position ||= next_position
  end

end
