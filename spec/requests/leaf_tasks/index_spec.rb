# frozen_string_literal: true

RSpec.describe LeafTasksController, "#index" do
  it "lists the user's leaf tasks" do
    parent = create(:task, title: "parent")
    create(:task, user: parent.user, title: "child", parent_task: parent)
    login_as(parent.user)

    get "/leaf_tasks"

    expect(rendered).to have_css("#current-tasks", text: "child")
  end

  it "leaves out tasks that have sub tasks" do
    parent = create(:task, title: "parent")
    create(:task, user: parent.user, title: "child", parent_task: parent)
    login_as(parent.user)

    get "/leaf_tasks"

    expect(rendered).to have_no_css("#current-tasks", text: "parent")
  end

  it "lists the tasks waiting to be released separately" do
    user = create(:user)
    create(:task, user:, done_at: 1.week.ago, release_at: 1.day.from_now)

    login_as(user)
    get "/leaf_tasks"

    expect(rendered).to have_css("#pending-tasks .tasks-table__row--pending")
  end

  it "makes the current tasks draggable" do
    task = create(:task)
    login_as(task.user)

    get "/leaf_tasks"

    expect(rendered).to have_css("#current-tasks tr[draggable=true]")
  end

  it "does not make the pending tasks draggable" do
    user = create(:user)
    create(:task, user:, done_at: 1.week.ago, release_at: 1.day.from_now)

    login_as(user)
    get "/leaf_tasks"

    expect(rendered).to have_no_css("#pending-tasks tr[draggable]")
  end

  it "leaves the timeframe column out of the task rows" do
    task = create(:task)
    login_as(task.user)

    get "/leaf_tasks"

    expect(rendered).to have_no_css(".timeframe-select")
  end
end
