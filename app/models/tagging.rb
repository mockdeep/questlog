class Tagging < ActiveRecord::Base

  belongs_to :quickie
  belongs_to :context

  validates :quickie, :context, presence: true

  after_destroy :decrement_context

  def decrement_context
    context.decrement!(:quickies_count)
  end

end
