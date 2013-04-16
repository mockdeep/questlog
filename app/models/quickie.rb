class Quickie < ActiveRecord::Base

  belongs_to :user

  has_many :taggings, dependent: :destroy
  has_many :contexts, through: :taggings

  validates :title, :user, presence: true

  scope :undone, -> { where(done_at: nil) }

  default_scope -> { order(:updated_at) }

  def done=(done)
    self.done_at = done ? Time.zone.now : nil
  end

  def skip=(skip)
    touch if skip
  end

  def context_ids=(context_ids)
    context_ids = JSON.parse(context_ids) if context_ids.is_a?(String)
    super(context_ids)
  end

end
