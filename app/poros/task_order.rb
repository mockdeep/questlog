# frozen_string_literal: true

# The order tasks are listed in, wherever they are listed flat: soonest
# timeframe first, then priority, then wherever the user dragged them to.
class TaskOrder
  INBOX_POSITION = Timeframe::NAMES.length
  NO_PRIORITY = 4

  def self.sort(tasks)
    tasks.sort_by { |task| sort_key(task) }
  end

  def self.sort_key(task)
    [
      Timeframe::NAMES.index(task.timeframe) || INBOX_POSITION,
      task.priority || NO_PRIORITY,
      task.position,
      task.id,
    ]
  end
  private_class_method :sort_key
end
