# frozen_string_literal: true

RSpec.describe TimeframeSerializer, "#to_json" do
  it "splits the current tasks from the pending ones" do
    current = create(:task)
    pending = create(:task, done_at: 1.day.ago, release_at: 1.day.from_now)
    timeframe = build_timeframe(current:, pending:)

    expect(described_class.new.(timeframe)).to match(expected(current, pending))
  end

  def build_timeframe(current:, pending:)
    Timeframe.new(
      name: "today",
      current_tasks: [current],
      pending_tasks: [pending],
      minute_max: 90,
    )
  end

  def expected(current, pending)
    {
      name: "today",
      currentTasks: [hash_including(id: current.id)],
      pendingTasks: [hash_including(id: pending.id)],
      minuteMax: 90,
      minuteTotal: 60,
    }
  end
end
