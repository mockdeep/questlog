# frozen_string_literal: true

RSpec.describe TimeframeHelper, "#timeframe_spaces" do
  it "reports the minutes a timeframe has left" do
    spaces = helper.timeframe_spaces([timeframe(90)])

    expect(spaces["today"]).to eq(80)
  end

  it "reports an open ended timeframe as having endless room" do
    spaces = helper.timeframe_spaces([timeframe(nil)])

    expect(spaces["today"]).to eq(Float::INFINITY)
  end

  def timeframe(minute_max)
    Timeframe.new(
      name: "today",
      current_tasks: [build(:task, estimate_seconds: 600)],
      minute_max:,
    )
  end
end
