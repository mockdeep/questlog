# frozen_string_literal: true

RSpec.describe TaskTree, ".for" do
  it "nests sub tasks under their parent" do
    parent = create(:task)
    child = create(:task, user: parent.user, parent_task: parent)
    nodes = described_class.for(user: parent.user)

    expect(nodes.map { |node| node.children.map(&:task) }).to eq([[child]])
  end

  it "leaves tasks that have a parent out of the top level" do
    parent = create(:task)
    create(:task, user: parent.user, parent_task: parent)

    expect(described_class.for(user: parent.user).map(&:task)).to eq([parent])
  end

  it "leaves pending tasks out of the top level" do
    user = create(:user)
    create(:task, user:, done_at: 1.week.ago, release_at: 1.week.from_now)

    expect(described_class.for(user:)).to eq([])
  end

  it "orders root tasks by timeframe" do
    user = create(:user)
    later = create(:task, user:, timeframe: "year")
    sooner = create(:task, user:, timeframe: "today")

    expect(described_class.for(user:).map(&:task)).to eq([sooner, later])
  end

  it "orders root tasks without a timeframe last" do
    user = create(:user)
    inbox = create(:task, user:)
    scheduled = create(:task, user:, timeframe: "decade")

    expect(described_class.for(user:).map(&:task)).to eq([scheduled, inbox])
  end

  it "orders root tasks of the same timeframe by priority" do
    user = create(:user)
    low = create(:task, user:, priority: 3)
    high = create(:task, user:, priority: 1)

    expect(described_class.for(user:).map(&:task)).to eq([high, low])
  end

  it "orders root tasks without a priority last" do
    user = create(:user)
    unprioritised = create(:task, user:)
    prioritised = create(:task, user:, priority: 3)

    expect(described_class.for(user:).map(&:task))
      .to eq([prioritised, unprioritised])
  end
end
