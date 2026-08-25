# frozen_string_literal: true

RSpec.describe TimeframeHelper, "#timeframe_section_class" do
  it "marks the inbox out from the timeframes" do
    timeframe = Timeframe.new(name: "inbox")

    expect(helper.timeframe_section_class(timeframe)).to eq("inbox")
  end

  it "marks every other section as a timeframe" do
    timeframe = Timeframe.new(name: "today")

    expect(helper.timeframe_section_class(timeframe)).to eq("timeframe")
  end
end
