# frozen_string_literal: true

RSpec.describe TimeframeHelper, "#timeframe_over_limit?" do
  it "is over the limit when its tasks add up to more than it allows" do
    expect(helper.timeframe_over_limit?(timeframe(5))).to be(true)
  end

  it "is within the limit when its tasks fit" do
    expect(helper.timeframe_over_limit?(timeframe(90))).to be(false)
  end

  it "is never over the limit when it is open ended" do
    expect(helper.timeframe_over_limit?(timeframe(nil))).to be(false)
  end

  def timeframe(minute_max)
    Timeframe.new(
      name: "today",
      current_tasks: [build(:task, estimate_seconds: 600)],
      minute_max:,
    )
  end
end
