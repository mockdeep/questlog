class Tag < ApplicationRecord
  extend FriendlyId

  friendly_id :name, use: :scoped, scope: :user_id

  belongs_to :user

  has_many :taggings, dependent: :destroy, inverse_of: :tag
  has_many :unfinished_tasks,
           -> { where(tasks: { done_at: nil }) },
           through: :taggings,
           source: :task
  has_many :tasks, through: :taggings

  validates :name, :user, presence: true
  validates :name, uniqueness: { scope: :user_id }

  scope :ordered, -> { order(:name) }
  scope :active, -> { where('tags.unfinished_tasks_count > 0') }

  def self.find_or_create_all(options)
    user = options.fetch(:user)
    names = options.fetch(:names)

    existing_tags = user.tags.where(name: names)
    missing_names = names - existing_tags.map(&:name)
    tag_params = missing_names.map { |name| { user:, name: } }
    existing_tags + create!(tag_params)
  end

  def should_generate_new_friendly_id?
    true
  end

  def normalize_friendly_id(value)
    value.to_s.parameterize(preserve_case: true)
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
end
