class Task < ActiveRecord::Base

  belongs_to :user, counter_cache: true

  has_many :taggings, dependent: :destroy
  has_many :contexts, through: :taggings

  validates :time_estimate, numericality: true, allow_nil: true
  validates :title, :user, presence: true
  validates(
    :repeat_string,
    inclusion: { in: Repeat.repeat_maps.keys },
    allow_nil: true,
  )
  validates :priority, inclusion: { in: [1, 2, 3] }, allow_nil: true

  scope :undone, -> { where(done_at: nil) }
  scope :done, -> { where('done_at IS NOT NULL') }
  scope :ready_to_release, -> { done.where('release_at < ?', Time.zone.now) }
  scope :with_estimate, -> { where('time_estimate IS NOT NULL') }
  scope :with_release, -> { where('release_at IS NOT NULL') }
  scope :pending, -> { done.with_release.order(:release_at) }

  def self.between(start_time, end_time)
    where('done_at >= ? AND done_at < ?', start_time, end_time)
  end

  def self.next
    undone.order(:priority).order(:updated_at).first
  end

  def self.priorities
    [nil, 1, 2, 3]
  end

  def done=(done)
    self.done_at = done ? Time.zone.now : nil
    if changed_to_done?
      decrement_contexts
      decrement_user
      if repeat_string
        self.release_at = Time.zone.now + repeat.time_delta
      end
      self.skip_count = 0
    elsif changed_to_not_done?
      increment_contexts
      increment_user
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

  def context_ids=(context_ids)
    context_ids = JSON.parse(context_ids) if context_ids.is_a?(String)
    self.contexts = user.contexts.find(context_ids)
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

private

  def increment_contexts
    contexts.each(&:increment_tasks_count!)
  end

  def decrement_contexts
    contexts.each(&:decrement_tasks_count!)
  end

  def decrement_user
    User.decrement_counter(:tasks_count, user.id)
  end

  def increment_user
    User.increment_counter(:tasks_count, user.id)
  end

end
