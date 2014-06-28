class Context < ActiveRecord::Base

  extend FriendlyId
  friendly_id :name, use: :slugged

  belongs_to :user

  has_many :taggings
  has_many :tasks, through: :taggings

  validates :name, :user, presence: true
  validates :name, uniqueness: { scope: :user_id }

  scope :ordered, -> { order(:name) }
  scope :active, -> { where('contexts.tasks_count > 0') }

  def any?
    tasks_count > 0
  end

  def next_task
    tasks.next
  end

  def update_tasks_count!
    update_attributes!(tasks_count: tasks.count)
  end

end
