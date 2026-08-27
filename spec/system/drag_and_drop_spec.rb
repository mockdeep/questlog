# frozen_string_literal: true

# The three flat task lists share one set of partials and one drag controller,
# so dragging is covered once here; each list's own request spec pins that its
# rows are the draggable ones.
RSpec.describe "dragging tasks" do
  it "allows the user to reorder current tasks" do
    user = create(:user)
    create(:task, user:, title: "task one")
    create(:task, user:, title: "task two")
    create(:task, user:, title: "task three")
    system_login_as(user)
    visit "/tasks"
    expect(current_tasks).to have_task("task one")

    drag_task("task three", "task one")

    # The dragged row only takes the position it displaced once the update has
    # round-tripped, so this waits out the frame swap that reading the titles
    # would otherwise race.
    expect(current_tasks)
      .to have_css("tr[data-position='1'] .task-input", text: "task three")
    expect(current_task_titles).to eq(["task three", "task one", "task two"])

    visit "/tasks"
    expect(current_tasks).to have_task("task one")
    expect(current_task_titles).to eq(["task three", "task one", "task two"])
  end

  it "assigns a priority to tasks dragged next to prioritized tasks" do
    user = create(:user)
    create(:task, user:, title: "urgent task", priority: 1)
    create(:task, user:, title: "casual task")
    system_login_as(user)
    visit "/tasks"
    expect(current_tasks).to have_task("urgent task")

    drag_task("casual task", "urgent task")

    # The priority class appears once the update has round-tripped to the
    # server, so the reloaded page is guaranteed to show the final state.
    expect(current_tasks).to have_css(
      ".tasks-table__row--priority-1 .task-input",
      text: "casual task",
    )

    visit "/tasks"
    expect(current_tasks).to have_task("casual task")
    expect(current_task_titles).to eq(["casual task", "urgent task"])
    expect(task_row("casual task")["class"]).to include("priority-1")
  end

  it "does not allow dragging pending tasks" do
    user = create(:user)
    create(:task, user:, title: "current task")
    create(
      :task,
      user:,
      title: "pending task",
      done_at: Time.zone.now,
      release_at: 1.week.from_now,
    )
    system_login_as(user)
    visit "/tasks"

    expect(pending_tasks).to have_task("pending task")
    expect(task_row("current task")["draggable"]).to eq("true")
    expect(task_row("pending task")["draggable"]).not_to(eq("true"))
  end
end
