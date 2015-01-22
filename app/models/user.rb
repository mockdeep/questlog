class User < ActiveRecord::Base

  belongs_to :account, dependent: :destroy, polymorphic: true

  has_many :tasks, dependent: :destroy
  has_many :unfinished_tasks,
           -> { where('tasks.done_at' => nil) },
           class_name: 'Task'
  has_many :tags, dependent: :destroy

  delegate :guest?, to: :account

  def next_task(tag_id = nil)
    if tag_id
      tags.friendly.find(tag_id).next_task
    else
      tasks.next
    end
  end

  def admin?
    !account.guest? && account.email == 'lobatifricha@gmail.com'
  end

  def ordered_tags
    tags.ordered
  end

  def absorb(other)
    self.tasks += other.tasks
    User.reset_counters(id, :unfinished_tasks)
    merge_tags(other.tags)
    other.reload.destroy
  end

  def merge_tags(other_tags)
    tag_names = tags.pluck(:name)
    other_tags.each do |other_tag|
      if tag_names.include?(other_tag.name)
        tag = tags.find_by_name(other_tag.name)
        other_tag.tasks.each do |task|
          task.tags << tag
        end
        other_tag.destroy
      else
        other_tag.update_attributes!(user: self)
      end
    end
  end

  def priority
    tasks.undone.pluck(:priority).compact.min
  end

end
