# frozen_string_literal: true

RSpec.describe RootTasksController, "#index" do
  it "lists the user's root tasks" do
    parent = create(:task, title: "parent")
    create(:task, user: parent.user, title: "child", parent_task: parent)
    login_as(parent.user)

    get "/root_tasks"

    expect(rendered).to have_css("#current-tasks", text: "parent")
  end

  it "leaves out sub tasks" do
    parent = create(:task, title: "parent")
    create(:task, user: parent.user, title: "child", parent_task: parent)
    login_as(parent.user)

    get "/root_tasks"

    expect(rendered).to have_no_css("#current-tasks", text: "child")
  end

  it "lists the tasks waiting to be released separately" do
    user = create(:user)
    create(:task, user:, done_at: 1.week.ago, release_at: 1.day.from_now)

    login_as(user)
    get "/root_tasks"

    expect(rendered).to have_css("#pending-tasks .tasks-table__row--pending")
  end

  it "makes the current tasks draggable" do
    task = create(:task)
    login_as(task.user)

    get "/root_tasks"

    expect(rendered).to have_css("#current-tasks tr[draggable=true]")
  end

  it "does not make the pending tasks draggable" do
    user = create(:user)
    create(:task, user:, done_at: 1.week.ago, release_at: 1.day.from_now)

    login_as(user)
    get "/root_tasks"

    expect(rendered).to have_no_css("#pending-tasks tr[draggable]")
  end

  it "leaves the timeframe column out of the task rows" do
    task = create(:task)
    login_as(task.user)

    get "/root_tasks"

    expect(rendered).to have_no_css(".timeframe-select")
  end
end
