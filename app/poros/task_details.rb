# frozen_string_literal: true

# A task's settings, written out as the lines listed under its title.
class TaskDetails
  def self.for(task)
    new(task).()
  end

  def initialize(task)
    @task = task
  end

  def call
    [
      "Repeat: #{repeat}",
      "Estimate: #{estimate}",
      "Priority: #{priority}",
      "Tags: #{tags}",
    ]
  end

  private

  attr_reader :task

  def repeat
    return "never" unless task.repeat_seconds

    "every #{ToEnglish.seconds(task.repeat_seconds)}"
  end

  def estimate
    return "none" unless task.estimate_seconds

    ToEnglish.seconds(task.estimate_seconds)
  end

  def priority
    task.priority || "none"
  end

  def tags
    return "none" if task.tag_names.empty?

    task.tag_names.join(", ")
  end
end
