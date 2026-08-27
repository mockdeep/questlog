# frozen_string_literal: true

RSpec.describe TaskList, ".all" do
  it "lists a task and its sub tasks alike" do
    parent = create(:task, title: "parent")
    child = create(:task, user: parent.user, parent_task: parent)

    expect(described_class.all(user: parent.user).current)
      .to contain_exactly(parent, child)
  end

  it "leaves the tasks waiting to be released out of the current list" do
    user = create(:user)
    create(:task, user:, done_at: 1.week.ago, release_at: 1.week.from_now)

    expect(described_class.all(user:).current).to eq([])
  end

  it "lists the tasks waiting to be released as pending" do
    user = create(:user)
    task = create(:task, user:, done_at: 1.week.ago, release_at: 1.day.from_now)

    expect(described_class.all(user:).pending).to eq([task])
  end

  it "leaves out done tasks" do
    user = create(:user)
    create(:task, user:, done_at: 1.week.ago)

    expect(described_class.all(user:).current).to eq([])
  end

  it "leaves out another user's tasks" do
    user = create(:user)
    create(:task)

    expect(described_class.all(user:).current).to eq([])
  end

  it "orders the tasks the way every other flat list is ordered" do
    user = create(:user)
    later = create(:task, user:, timeframe: "year")
    sooner = create(:task, user:, timeframe: "today")

    expect(described_class.all(user:).current).to eq([sooner, later])
  end
end
