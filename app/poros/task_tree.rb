# frozen_string_literal: true

class TaskTree
  Node = Data.define(:task, :children)

  def self.for(user:)
    new(user).()
  end

  def initialize(user)
    @user = user
  end

  def call
    root_tasks.map { |task| node_for(task) }
  end

  private

  attr_reader :user

  def tasks
    @tasks ||= user.undone_and_pending_tasks.sort_by(&:id)
  end

  def children
    @children ||= tasks.group_by(&:parent_task_id)
  end

  def root_tasks
    TaskOrder.sort(tasks.select { |task| root?(task) })
  end

  def root?(task)
    task.parent_task_id.nil? && task.status == "active"
  end

  def node_for(task)
    Node.new(task:, children: children_of(task).map { |child| node_for(child) })
  end

  def children_of(task)
    children.fetch(task.id, [])
  end
end
