class User < ActiveRecord::Base
  has_secure_password

  attr_accessible :email

  validates :email, presence: true
  validates :password, presence: true, on: :create

  def self.authenticate(email, password)
    User.find_by_email(email).try(:authenticate, password)
  end
end
