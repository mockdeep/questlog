# frozen_string_literal: true

RSpec.describe TimeframeHelper, "#timeframe_label" do
  it "gives the inbox a name of its own" do
    expect(helper.timeframe_label("inbox")).to eq("Inbox")
  end

  it "names a timeframe as the span of time it covers" do
    expect(helper.timeframe_label("quarter")).to eq("This Quarter")
  end
end
