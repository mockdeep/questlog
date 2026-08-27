# frozen_string_literal: true

module LinkHelper
  def active_link_to(name, path, **params, &)
    params[:class] += " #{params[:class]}--active" if current_page?(path)

    link_to(name, path, **params, &)
  end

  # Task rows and bread crumbs sit inside a turbo frame, so their links have to
  # say that they are leaving it, or the frame swallows the navigation.
  def task_link_to(name, task)
    link_to(
      name,
      task_path(task),
      class: "task-link",
      data: { turbo_frame: "_top" },
    )
  end
end
