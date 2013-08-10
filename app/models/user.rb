class User < ActiveRecord::Base

  belongs_to :account, dependent: :destroy, polymorphic: true

  has_many :quickies, dependent: :destroy
  has_many :contexts, dependent: :destroy

  validates :mode, inclusion: { in: ['simple', 'advanced'] }

  delegate :email, :guest?, to: :account

  def next_quickie(context_id = nil)
    if context_id
      contexts.find(context_id).next_quickie
    else
      quickies.next
    end
  end

  def admin?
    !account.guest? && email == 'lobatifricha@gmail.com'
  end

  def ordered_contexts
    contexts.ordered
  end

  def other_mode
    mode == 'simple' ? 'advanced' : 'simple'
  end

end
