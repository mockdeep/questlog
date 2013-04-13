class Quickie < ActiveRecord::Base

  belongs_to :user

  validates :title, presence: true

  scope :undone, -> { where(done_at: nil) }
  default_scope -> { order(:updated_at) }

  def done=(done)
    if done
      self.done_at = Time.zone.now
    else
      self.done_at = nil
    end
  end

  def skip=(skip)
    touch if skip
  end
end
