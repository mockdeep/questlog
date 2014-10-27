class Tagging < ActiveRecord::Base

  belongs_to :task
  belongs_to :tag,
             foreign_key: :context_id,
             counter_cache: :unfinished_tasks_count

  validates :task, :tag, presence: true
  validates :task_id, uniqueness: { scope: :context_id }

end
