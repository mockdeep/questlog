# frozen_string_literal: true

class Task < ApplicationRecord
  class Update
    include JunkDrawer::Callable

    def call(task, task_params)
      task_params[:timeframe] = nil if task_params[:timeframe] == "inbox"
      make_room(task, task_params[:position])
      task.attributes = task_params
      task.save!
      record_completed_stat(task) if task_params[:done]
    end

    private

    # Positions are a single sequence across all of a user's tasks, so a task
    # taking a new one has to push the tasks it displaces out of the way.
    def make_room(task, position)
      return if position.nil?

      position = Integer(position)
      return if position == task.position

      if position < task.position
        shift(task, position...task.position, 1)
      else
        shift(task, (task.position + 1)..position, -1)
      end
    end

    # Shifting is a bulk move of rows the user did not touch, so it
    # deliberately skips the validations and callbacks a save would run.
    def shift(task, positions, offset)
      task
        .user
        .tasks
        .where(position: positions)
        .update_all(["position = position + ?", offset])
    end

    def record_completed_stat(task)
      Stat::Create.(
        user: task.user,
        value: task.estimate_seconds,
        name: "seconds-completed",
      )
    end
  end
end
