class User < ActiveRecord::Base

  belongs_to :account, dependent: :destroy, polymorphic: true

  has_many :tasks, dependent: :destroy
  has_many :contexts, dependent: :destroy

  validates :mode, inclusion: { in: %w(simple advanced) }

  delegate :guest?, to: :account

  def next_task(context_id = nil)
    if context_id
      contexts.find(context_id).next_task
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

  def other_mode
    mode == 'simple' ? 'advanced' : 'simple'
  end

  def absorb(other)
    add_count = other.tasks.count
    self.tasks += other.tasks
    add_count.times { User.increment_counter(:tasks_count, id) }
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
