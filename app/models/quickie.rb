class Quickie < ActiveRecord::Base

  belongs_to :user, counter_cache: true

  has_many :taggings, dependent: :destroy
  has_many :contexts, through: :taggings

  validates :time_estimate, numericality: true, allow_nil: true
  validates :title, :user, presence: true
  validates :repeat_string, inclusion: { in: Repeat.repeat_maps.keys }, allow_blank: true

  scope :undone, -> { where(done_at: nil) }
  scope :done, -> { where("done_at IS NOT NULL") }
  scope :with_estimate, -> { where("time_estimate IS NOT NULL") }

  default_scope -> { order(:updated_at) }

  def self.between(start_time, end_time)
    where("done_at >= ? AND done_at < ?", start_time, end_time)
  end

  def self.minutes_for_day(day)
    done.with_estimate.between(day.beginning_of_day, day).sum(:time_estimate)
  end

  def done=(done)
    self.done_at = done ? Time.zone.now : nil
    if done_at && !done_at_was
      decrement_contexts
      decrement_user
      self.skip_count = 0
    elsif !done_at && done_at_was
      increment_contexts
      increment_user
    end
  end

  def skip=(skip)
    increment!(:skip_count) if skip
  end

  def context_ids=(context_ids)
    context_ids = JSON.parse(context_ids) if context_ids.is_a?(String)
    super(context_ids)
    increment_contexts
  end

  def check_repeat
    update_attributes(done: false) if repeat && time_to_repeat?
  end

  def repeat
    @repeat ||= Repeat.new(repeat_string) if repeat_string.present?
  end

  def time_to_repeat?
    done_at && Time.zone.now > done_at + repeat.time_delta
  end

  def over_skipped?
    skip_count >= 5
  end

private

  def increment_contexts
    contexts.each { |context| context.increment!(:quickies_count) }
  end

  def decrement_contexts
    contexts.each { |context| context.decrement!(:quickies_count) }
  end

  def decrement_user
    User.decrement_counter(:quickies_count, user.id)
  end

  def increment_user
    User.increment_counter(:quickies_count, user.id)
  end

end
