# frozen_string_literal: true

RSpec.describe TasksController, "#index" do
  let(:user) { create(:user) }

  before { login_as(user) }

  it "lists the user's tasks" do
    create(:task, user:, title: "wash the dishes")

    get "/tasks"

    expect(rendered).to have_css("#current-tasks", text: "wash the dishes")
  end

  it "lists sub tasks alongside the tasks they belong to" do
    parent = create(:task, user:, title: "parent")
    create(:task, user:, title: "child", parent_task: parent)

    get "/tasks"

    expect(rendered).to have_css("#current-tasks", text: "child")
  end

  it "lists the tasks waiting to be released separately" do
    create(:task, user:, done_at: 1.week.ago, release_at: 1.day.from_now)

    get "/tasks"

    expect(rendered).to have_css("#pending-tasks .tasks-table__row--pending")
  end

  it "makes the current tasks draggable" do
    create(:task, user:)

    get "/tasks"

    expect(rendered).to have_css("#current-tasks tr[draggable=true]")
  end

  it "does not make the pending tasks draggable" do
    create(:task, user:, done_at: 1.week.ago, release_at: 1.day.from_now)

    get "/tasks"

    expect(rendered).to have_no_css("#pending-tasks tr[draggable]")
  end

  it "leaves the timeframe column out of the task rows" do
    create(:task, user:)

    get "/tasks"

    expect(rendered).to have_no_css(".timeframe-select")
  end
end
