class FreeAccount < ApplicationRecord

  has_secure_password

  has_one :user, as: :account

  validates :email, presence: true, uniqueness: { case_sensitive: false }

  def email=(email)
    email = email.downcase if email
    super(email)
  end

  def guest?
    false
  end

end
