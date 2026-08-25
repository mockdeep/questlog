# frozen_string_literal: true

module TaskHelper
  def task_title_class(task)
    modifier = "task-item__title--priority-#{task.priority}" if task.priority

    ["task-item__title", modifier].compact
  end

  def complete_task_form_options(task)
    {
      url: task_path(task),
      method: :patch,
      class: "task-item__checkbox-form",
      data: {
        turbo: true,
        controller: "auto-submit",
        action: "change->auto-submit#submit",
      },
    }
  end
end
