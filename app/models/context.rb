class Context < ActiveRecord::Base

  extend FriendlyId
  friendly_id :name, use: :slugged

  belongs_to :user

  has_many :taggings
  has_many :quickies, through: :taggings

  validates :name, :user, presence: true

  scope :ordered, -> { order(:name) }

  delegate :minutes_for_day, to: :quickies

  def any?
    quickies_count > 0
  end

  def next_quickie
    quickies.next
  end

end
