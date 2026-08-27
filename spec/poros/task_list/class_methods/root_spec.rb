# frozen_string_literal: true

RSpec.describe TaskList, ".root" do
  it "lists tasks with no parent task" do
    task = create(:task)

    expect(described_class.root(user: task.user).current).to eq([task])
  end

  it "leaves out sub tasks" do
    parent = create(:task)
    create(:task, user: parent.user, parent_task: parent)

    expect(described_class.root(user: parent.user).current).to eq([parent])
  end

  it "leaves out a sub task whose parent is done" do
    parent = create(:task, done_at: 1.day.ago)
    create(:task, user: parent.user, parent_task: parent)

    expect(described_class.root(user: parent.user).current).to eq([])
  end

  it "leaves the tasks waiting to be released out of the current list" do
    user = create(:user)
    create(:task, user:, done_at: 1.week.ago, release_at: 1.week.from_now)

    expect(described_class.root(user:).current).to eq([])
  end

  it "lists the tasks waiting to be released as pending" do
    user = create(:user)
    task = create(:task, user:, done_at: 1.week.ago, release_at: 1.day.from_now)

    expect(described_class.root(user:).pending).to eq([task])
  end

  it "leaves out done tasks" do
    user = create(:user)
    create(:task, user:, done_at: 1.week.ago)

    expect(described_class.root(user:).current).to eq([])
  end

  it "leaves out another user's tasks" do
    user = create(:user)
    create(:task)

    expect(described_class.root(user:).current).to eq([])
  end

  it "orders the tasks the way every other flat list is ordered" do
    user = create(:user)
    later = create(:task, user:, timeframe: "year")
    sooner = create(:task, user:, timeframe: "today")

    expect(described_class.root(user:).current).to eq([sooner, later])
  end
end
