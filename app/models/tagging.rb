class Tagging < ActiveRecord::Base

  belongs_to :quickie
  belongs_to :context

  validates :quickie, :context, presence: true

end
