# frozen_string_literal: true

# A flat list of a user's tasks, split into the ones they can work on now and
# the ones waiting to be released.
class TaskList
  Result = Data.define(:current, :pending)

  def self.all(user:)
    new(user).all
  end

  def self.leaf(user:)
    new(user).leaf
  end

  def self.root(user:)
    new(user).root
  end

  def initialize(user)
    @user = user
  end

  def all
    partition(ordered_tasks)
  end

  def leaf
    partition(ordered_tasks.reject { |task| parent_ids.include?(task.id) })
  end

  def root
    partition(ordered_tasks.reject(&:parent_task_id))
  end

  private

  attr_reader :user

  def tasks
    @tasks ||= user.undone_and_pending_tasks
  end

  def ordered_tasks
    @ordered_tasks ||= TaskOrder.sort(tasks)
  end

  def parent_ids
    @parent_ids ||= tasks.filter_map(&:parent_task_id).to_set
  end

  def partition(tasks)
    current, pending = tasks.partition { |task| task.status == "active" }

    Result.new(current:, pending:)
  end
end
