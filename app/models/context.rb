class Context < ActiveRecord::Base

  extend FriendlyId
  friendly_id :name, use: :slugged

  belongs_to :user

  has_many :taggings, dependent: :destroy, inverse_of: :context
  has_many :unfinished_tasks,
           -> { where('tasks.done_at' => nil) },
           through: :taggings,
           source: :task
  has_many :tasks, through: :taggings

  validates :name, :user, presence: true
  validates :name, uniqueness: { scope: :user_id }

  scope :ordered, -> { order(:name) }
  scope :active, -> { where('contexts.unfinished_tasks_count > 0') }

  def any?
    unfinished_tasks_count > 0
  end

  def next_task
    tasks.next
  end

  def increment_tasks_count!
    self.class.increment_counter(:unfinished_tasks_count, id)
  end

  def decrement_tasks_count!
    self.class.decrement_counter(:unfinished_tasks_count, id)
  end

  def self.find_or_create_all(options)
    user = options.fetch(:user)
    names = options.fetch(:names)

    existing_contexts = user.contexts.where(name: names)
    missing_names = names - existing_contexts.map(&:name)
    tag_params = missing_names.map { |name| { user: user, name: name } }
    existing_contexts + create!(tag_params)
  end

end
