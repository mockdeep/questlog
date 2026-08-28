# frozen_string_literal: true

RSpec.describe TasksController, "#show" do
  let(:task) { create(:task) }
  let(:user) { task.user }

  before(:each) do
    login_as(user)
  end

  it "renders the new task form with the task as its parent" do
    create(:task, user:)

    get "/tasks/#{task.id}"

    expect(rendered)
      .to have_field("task[parent_task_id]", with: task.id, type: :hidden)
  end

  it "offers the task's title for editing" do
    get "/tasks/#{task.id}"

    expect(rendered).to have_field("task[title]", with: task.title)
  end

  it "links to the tasks it sits under, outermost first" do
    parent = create(:task, user:, title: "parent", done_at: 1.week.ago)
    child = create(:task, user:, title: "child", parent_task: parent)

    get "/tasks/#{child.id}"

    expect(rendered).to have_link("parent", href: "/tasks/#{parent.id}")
  end

  it "lists the task's details" do
    task.update!(priority: 2)

    get "/tasks/#{task.id}"

    expect(rendered).to have_text("Priority: 2")
  end

  it "lists the task's sub tasks" do
    create(:task, user:, title: "a sub task", parent_task: task)

    get "/tasks/#{task.id}"

    expect(rendered).to have_css("#sub-tasks", text: "a sub task")
  end

  it "leaves out sub tasks that are done" do
    create(:task, user:, parent_task: task, done_at: 1.week.ago)

    get "/tasks/#{task.id}"

    expect(rendered).to have_no_css("#sub-tasks")
  end

  it "keeps sub tasks waiting to be released" do
    create(
      :task,
      user:,
      title: "a pending sub task",
      parent_task: task,
      done_at: 1.week.ago,
      release_at: 1.day.from_now,
    )

    get "/tasks/#{task.id}"

    expect(rendered).to have_css("#sub-tasks", text: "a pending sub task")
  end
end
