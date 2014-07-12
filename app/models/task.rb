class Task < ActiveRecord::Base

  belongs_to :user, counter_cache: true

  has_many :taggings, dependent: :destroy
  has_many :contexts, through: :taggings

  validates :priority, :time_estimate, numericality: true, allow_nil: true
  validates :title, :user, presence: true
  validates(
    :repeat_string,
    inclusion: { in: Repeat.repeat_maps.keys },
    allow_nil: true,
  )

  scope :undone, -> { where(done_at: nil) }
  scope :done, -> { where('done_at IS NOT NULL') }
  scope :ready_to_release, -> { done.where('release_at < ?', Time.zone.now) }
  scope :with_estimate, -> { where('time_estimate IS NOT NULL') }
  scope :with_release, -> { where('release_at IS NOT NULL') }
  scope :pending, -> { done.with_release.order(:release_at) }

  attr_writer :tag_names

  after_save :associate_contexts, :update_counters

  def self.between(start_time, end_time)
    where('done_at >= ? AND done_at < ?', start_time, end_time)
  end

  def self.next
    undone.order(:priority).order(:updated_at).first
  end

  def done=(done)
    self.done_at = done ? Time.zone.now : nil
    if changed_to_done?
      @decrement_counters = true
      self.release_at ||= Time.zone.now + repeat.time_delta if repeat_string
      self.skip_count = 0
    elsif changed_to_not_done?
      @increment_counters = true
      self.release_at = nil
    end
  end

  def changed_to_done?
    done_at && !done_at_was
  end

  def changed_to_not_done?
    !done_at && done_at_was
  end

  def skip=(skip)
    increment!(:skip_count) if skip
  end

  def repeat
    @repeat ||= Repeat.new(repeat_string) if repeat_string.present?
  end

  def repeat?
    !!repeat
  end

  def release!
    update_attributes!(done: false)
  end

  def done?
    done_at?
  end

  def over_skipped?
    skip_count >= 5
  end

  def repeat_string=(new_repeat_string)
    new_repeat_string = nil if new_repeat_string.blank?
    super(new_repeat_string)
  end

  def release_at=(new_release_at)
    super
    self.done = new_release_at.present? unless done_at_changed?
  end

private

  def increment_counters
    contexts.each(&:increment_tasks_count!)
    User.increment_counter(:tasks_count, user.id)
  end

  def decrement_counters
    contexts.each(&:decrement_tasks_count!)
    User.decrement_counter(:tasks_count, user.id)
  end

  def associate_contexts
    return unless @tag_names
    these_contexts = user.contexts.where(name: @tag_names)
    missing_names = @tag_names - these_contexts.map(&:name)
    these_contexts += missing_names.map do |tag_name|
      user.contexts.create!(name: tag_name)
    end
    self.contexts = these_contexts
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

end
