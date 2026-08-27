# frozen_string_literal: true

RSpec.describe Task, "#parent_tasks" do
  it "is empty for a task that sits under nothing" do
    expect(build(:task).parent_tasks).to eq([])
  end

  it "lists the chain of parents, outermost first" do
    grandparent = create(:task)
    user = grandparent.user
    parent = create(:task, user:, parent_task: grandparent)
    task = create(:task, user:, parent_task: parent)

    expect(task.parent_tasks).to eq([grandparent, parent])
  end

  it "includes parents that have been completed" do
    parent = create(:task, done_at: 1.week.ago)
    task = create(:task, user: parent.user, parent_task: parent)

    expect(task.parent_tasks).to eq([parent])
  end
end
