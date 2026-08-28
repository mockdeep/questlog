# frozen_string_literal: true

module FocusHelper
  POSTPONE_OPTIONS = [
    ["5 minutes", 300],
    ["30 minutes", 1800],
    ["1 hour", 3600],
    ["3 hours", 10_800],
    ["6 hours", 21_600],
    ["9 hours", 32_400],
    ["12 hours", 43_200],
    ["1 day", 86_400],
    ["2 days", 172_800],
    ["3 days", 259_200],
    ["1 week", 604_800],
    ["2 weeks", 1_209_600],
    ["1 month", 2_592_000],
  ].freeze

  SKIPS_BEFORE_WARNING = 15

  def focus_task_classes(task)
    [
      "col-md-12",
      "task-display",
      ("priority-#{task.priority}" if task.priority),
      ("over-skipped" if task.skip_count >= SKIPS_BEFORE_WARNING),
    ].compact
  end

  def postpone_options
    options_for_select(POSTPONE_OPTIONS, POSTPONE_OPTIONS.first.last)
  end

  POSTPONE_DATA = {
    turbo: true,
    controller: "postpone",
    action: "click->postpone#submit",
  }.freeze

  def postpone_form_options(task)
    {
      url: task_path(task),
      method: :patch,
      id: "postpone",
      class: "btn btn-info btn-lg btn-block postpone-button",
      data: POSTPONE_DATA,
    }
  end

  def task_repeat_emblem(task)
    return unless task.repeat_seconds

    tag.i(class: "fas fa-redo-alt", title: "task repeats")
  end

  def focus_delete_button(task)
    button_to(
      task_path(task),
      method: :delete,
      class: "delete-button",
      title: "delete task",
      form: {
        class: "contents-form",
        data: { turbo: true, turbo_confirm: delete_confirmation },
      },
    ) { tag.i(class: "fas fa-times") }
  end
end
