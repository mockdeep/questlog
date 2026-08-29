# frozen_string_literal: true

module TaskHelper
  def task_title_class(task)
    modifier = "task-item__title--priority-#{task.priority}" if task.priority

    ["task-item__title", modifier].compact
  end

  # A draggable row carries what the drag needs to work out where the task
  # landed: which task it is, and the position and priority it started with.
  def task_row_options(task, status:, draggable:)
    options = { class: task_row_class(task, status) }
    return options unless draggable

    options.merge(draggable: "true", data: task_drag_data(task))
  end

  def task_drag_options
    {
      controller: "task-drag",
      action: "dragstart->task-drag#start dragover->task-drag#move " \
              "dragend->task-drag#drop",
    }
  end

  def task_drag_data(task)
    {
      task_drag_target: "row",
      task_id: task.id,
      position: task.position,
      priority: task.priority,
    }
  end

  def task_row_class(task, status)
    [
      "tasks-table__row",
      ("tasks-table__row--priority-#{task.priority}" if task.priority),
      ("tasks-table__row--#{status}" if status),
    ].compact
  end

  def task_action_button(label, task, attributes)
    button_to(
      label,
      task_path(task),
      method: :patch,
      params: { task: attributes },
      class: "btn btn-link tasks-table__action",
      form: { class: "contents-form", data: { turbo: true } },
    )
  end

  # joined so that no whitespace creeps in between the buttons
  def task_row_buttons(task)
    buttons = []
    buttons << task_action_button("UNDO", task, done: false) if task.release_at
    buttons << task_delete_button(task)

    safe_join(buttons)
  end

  def task_delete_button(task)
    button_to(
      "DELETE",
      task_path(task),
      method: :delete,
      class: "btn btn-link tasks-table__action",
      form: {
        class: "contents-form",
        data: { turbo: true, turbo_confirm: delete_confirmation },
      },
    )
  end

  def delete_confirmation
    t("tasks.destroy.confirm")
  end

  def task_field_form_options(task)
    {
      url: task_path(task),
      method: :patch,
      class: "contents-form",
      data: {
        turbo: true,
        controller: "auto-submit",
        action: "change->auto-submit#submit",
      },
    }
  end

  def task_title_field_options
    {
      id: nil,
      rows: 1,
      class: "task-input hidden-border",
      data: {
        controller: "task-title",
        action: "focus->task-title#reveal input->task-title#resize " \
                "keydown->task-title#saveOnEnter change->task-title#save",
      },
    }
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
