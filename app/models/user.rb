class User < ActiveRecord::Base

  has_secure_password

  has_many :quickies, dependent: :destroy
  has_many :contexts, dependent: :destroy

  validates :email, presence: true
  validates :password, presence: true, on: :create

  def self.authenticate(email, password)
    User.find_by_email(email).try(:authenticate, password)
  end

  def next_quickie(context_id=nil)
    if context_id
      contexts.find(context_id).next_quickie
    else
      quickies.next
    end
  end

  def admin?
    email == 'lobatifricha@gmail.com'
  end

  def ordered_contexts
    contexts.ordered
  end

end
