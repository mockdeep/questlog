class Quickie < ActiveRecord::Base

  belongs_to :user, counter_cache: true

  has_many :taggings, dependent: :destroy
  has_many :contexts, through: :taggings

  validates :title, :user, presence: true
  validates :repeat_string, inclusion: { in: Repeat.repeat_maps.keys }, allow_blank: true

  scope :undone, -> { where(done_at: nil) }

  default_scope -> { order(:updated_at) }

  def done=(done)
    self.done_at = done ? Time.zone.now : nil
    if done_at && !done_at_was
      decrement_contexts
      decrement_user
    elsif !done_at && done_at_was
      increment_contexts
      increment_user
    end
  end

  def skip=(skip)
    touch if skip
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

private

  def increment_contexts
    contexts.each { |context| context.increment!(:quickies_count) }
  end

  def decrement_contexts
    contexts.each { |context| context.decrement!(:quickies_count) }
  end

  def decrement_user
    user.decrement!(:quickies_count)
  end

  def increment_user
    user.increment!(:quickies_count)
  end

end
