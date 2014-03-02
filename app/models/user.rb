class User < ActiveRecord::Base

  belongs_to :account, dependent: :destroy, polymorphic: true

  has_many :quickies, dependent: :destroy
  has_many :contexts, dependent: :destroy

  validates :mode, inclusion: { in: %w(simple advanced) }

  delegate :guest?, to: :account

  def next_quickie(context_id = nil)
    if context_id
      contexts.find(context_id).next_quickie
    else
      quickies.next
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
    self.quickies += other.quickies
    User.reset_counters(id, :quickies)
    merge_contexts(other.contexts)
    other.reload.destroy
  end

  def merge_contexts(other_contexts)
    context_names = contexts.pluck(:name)
    other_contexts.each do |other_context|
      if context_names.include?(other_context.name)
        context = contexts.find_by_name(other_context.name)
        other_context.quickies.each do |quickie|
          quickie.contexts << context
        end
        other_context.destroy
      else
        other_context.update_attributes!(user: self)
      end
    end
  end

end
