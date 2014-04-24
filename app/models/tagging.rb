class Tagging < ActiveRecord::Base

  belongs_to :task
  belongs_to :context

  validates :task, :context, presence: true

  after_destroy :decrement_context

  def decrement_context
    context.decrement!(:tasks_count)
  end

end
