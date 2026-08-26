# frozen_string_literal: true

RSpec.describe TaskList, ".leaf" do
  it "lists tasks with no sub tasks" do
    parent = create(:task)
    child = create(:task, user: parent.user, parent_task: parent)

    expect(described_class.leaf(user: parent.user).current).to eq([child])
  end

  it "counts a task with only done sub tasks as a leaf" do
    parent = create(:task)
    create(:task, user: parent.user, parent_task: parent, done_at: 1.day.ago)

    expect(described_class.leaf(user: parent.user).current).to eq([parent])
  end

  it "leaves the tasks waiting to be released out of the current list" do
    user = create(:user)
    create(:task, user:, done_at: 1.week.ago, release_at: 1.week.from_now)

    expect(described_class.leaf(user:).current).to eq([])
  end

  it "lists the tasks waiting to be released as pending" do
    user = create(:user)
    task = create(:task, user:, done_at: 1.week.ago, release_at: 1.day.from_now)

    expect(described_class.leaf(user:).pending).to eq([task])
  end

  it "leaves out done tasks" do
    user = create(:user)
    create(:task, user:, done_at: 1.week.ago)

    expect(described_class.leaf(user:).current).to eq([])
  end

  it "leaves out another user's tasks" do
    user = create(:user)
    create(:task)

    expect(described_class.leaf(user:).current).to eq([])
  end

  it "orders tasks by timeframe" do
    user = create(:user)
    later = create(:task, user:, timeframe: "year")
    sooner = create(:task, user:, timeframe: "today")

    expect(described_class.leaf(user:).current).to eq([sooner, later])
  end

  it "orders tasks without a timeframe last" do
    user = create(:user)
    inbox = create(:task, user:)
    scheduled = create(:task, user:, timeframe: "decade")

    expect(described_class.leaf(user:).current).to eq([scheduled, inbox])
  end

  it "orders tasks of the same timeframe by priority" do
    user = create(:user)
    low = create(:task, user:, priority: 3)
    high = create(:task, user:, priority: 1)

    expect(described_class.leaf(user:).current).to eq([high, low])
  end

  it "orders tasks without a priority last" do
    user = create(:user)
    inbox = create(:task, user:)
    urgent = create(:task, user:, priority: 3)

    expect(described_class.leaf(user:).current).to eq([urgent, inbox])
  end

  it "orders tasks of the same priority by position" do
    user = create(:user)
    last = create(:task, user:, position: 2)
    first = create(:task, user:, position: 1)

    expect(described_class.leaf(user:).current).to eq([first, last])
  end

  it "orders tasks sharing a position by id" do
    user = create(:user)
    first = create(:task, user:, position: 1)
    second = create(:task, user:, position: 1)

    expect(described_class.leaf(user:).current).to eq([first, second])
  end

  it "orders the pending tasks the same way" do
    user = create(:user)
    attrs = { user:, done_at: 1.week.ago, release_at: 1.day.from_now }
    low = create(:task, **attrs, priority: 3)
    high = create(:task, **attrs, priority: 1)

    expect(described_class.leaf(user:).pending).to eq([high, low])
  end
end
