class Tagging < ApplicationRecord

  belongs_to :task
  belongs_to :tag, counter_cache: :unfinished_tasks_count

  validates :task, :tag, presence: true
  validates :task_id, uniqueness: { scope: :tag_id }

end
