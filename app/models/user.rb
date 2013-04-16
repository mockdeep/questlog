class User < ActiveRecord::Base

  has_secure_password

  has_many :quickies, dependent: :destroy
  has_many :contexts, dependent: :destroy

  validates :email, presence: true
  validates :password, presence: true, on: :create

  def self.authenticate(email, password)
    User.find_by_email(email).try(:authenticate, password)
  end

end
