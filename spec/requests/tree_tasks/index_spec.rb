# frozen_string_literal: true

NESTED_TITLE = ".task-item .task-item > span.task-item__title"

RSpec.describe TreeTasksController, "#index" do
  it "renders the user's tasks as a nested tree" do
    parent = create(:task, title: "parent")
    create(:task, user: parent.user, title: "child", parent_task: parent)
    login_as(parent.user)

    get "/tree_tasks"

    expect(rendered).to have_css(NESTED_TITLE, text: "child")
  end

  it "marks the priority of a task on its title" do
    task = create(:task, priority: 2)
    login_as(task.user)

    get "/tree_tasks"

    expect(rendered).to have_css("span.task-item__title--priority-2")
  end

  it "only lets a task without sub tasks be checked off" do
    parent = create(:task, title: "parent")
    create(:task, user: parent.user, title: "child", parent_task: parent)
    login_as(parent.user)

    get "/tree_tasks"

    expect(rendered).to have_css("input[type=checkbox][disabled]", count: 1)
  end
end
