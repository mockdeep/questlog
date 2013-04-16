class Context < ActiveRecord::Base

  belongs_to :user

  has_many :taggings
  has_many :quickies, through: :taggings

  validates :name, :user, presence: true

end
