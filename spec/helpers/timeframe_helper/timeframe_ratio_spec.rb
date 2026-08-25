# frozen_string_literal: true

RSpec.describe TimeframeHelper, "#timeframe_ratio" do
  it "reads the minutes used against the minutes allowed" do
    expect(helper.timeframe_ratio(timeframe(90))).to eq("10/90")
  end

  it "shows an open ended timeframe as boundless" do
    expect(helper.timeframe_ratio(timeframe(nil))).to eq("10/∞")
  end

  def timeframe(minute_max)
    Timeframe.new(
      name: "today",
      current_tasks: [build(:task, estimate_seconds: 600)],
      minute_max:,
    )
  end
end
