class FreeAccount < ApplicationRecord

  has_secure_password

  has_one :user, as: :account

  validates :email, presence: true, uniqueness: { case_sensitive: false }

  def guest?
    false
  end

end
