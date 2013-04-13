class Tag < ActiveRecord::Base

  attr_accessible :name

  belongs_to :user

  has_many :taggings
  has_many :quickies, through: :taggings

  validates :name, presence: true

end
