class User < ActiveRecord::Base

  belongs_to :account, dependent: :destroy, polymorphic: true

  has_many :tasks, dependent: :destroy
  has_many :unfinished_tasks,
           -> { where('tasks.done_at' => nil) },
           class_name: 'Task'
  has_many :contexts, dependent: :destroy

  delegate :guest?, to: :account

  def next_task(context_id = nil)
    if context_id
      contexts.friendly.find(context_id).next_task
    else
      tasks.next
    end
  end

  def admin?
    !account.guest? && account.email == 'lobatifricha@gmail.com'
  end

  def ordered_contexts
    contexts.ordered
  end

  def absorb(other)
    self.tasks += other.tasks
    User.reset_counters(id, :unfinished_tasks)
    merge_contexts(other.contexts)
    other.reload.destroy
  end

  def merge_contexts(other_contexts)
    context_names = contexts.pluck(:name)
    other_contexts.each do |other_context|
      if context_names.include?(other_context.name)
        context = contexts.find_by_name(other_context.name)
        other_context.tasks.each do |task|
          task.contexts << context
        end
        other_context.destroy
      else
        other_context.update_attributes!(user: self)
      end
    end
  end

end
