class Tagging < ActiveRecord::Base

  belongs_to :task
  belongs_to :context, counter_cache: :tasks_count

  validates :task, :context, presence: true

end
