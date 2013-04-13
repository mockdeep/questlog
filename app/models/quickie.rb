class Quickie < ActiveRecord::Base

  belongs_to :user

  has_many :taggings, dependent: :destroy
  has_many :tags, through: :taggings

  validates :title, :user, presence: true

  scope :undone, -> { where(done_at: nil) }

  default_scope -> { order(:updated_at) }

  def done=(done)
    self.done_at = done ? Time.zone.now : nil
  end

  def skip=(skip)
    touch if skip
  end

end
