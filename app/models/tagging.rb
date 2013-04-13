class Tagging < ActiveRecord::Base

  belongs_to :quickie
  belongs_to :tag

  validates :quickie, :tag, presence: true

end
