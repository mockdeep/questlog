class Context < ActiveRecord::Base

  extend FriendlyId
  friendly_id :name, use: :slugged

  belongs_to :user

  has_many :taggings
  has_many :quickies, through: :taggings

  validates :name, :user, presence: true

end
