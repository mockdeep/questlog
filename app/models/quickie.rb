class Quickie < ActiveRecord::Base

  belongs_to :user

  validates :title, presence: true

  scope :undone, -> { where(done_at: nil) }

  default_scope -> { order(:updated_at) }

  def done=(done)
    self.done_at = done ? Time.zone.now : nil
  end

  def skip=(skip)
    touch if skip
  end
end
