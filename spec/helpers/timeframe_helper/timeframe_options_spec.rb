# frozen_string_literal: true

RSpec.describe TimeframeHelper, "#timeframe_options" do
  it "offers every timeframe the page lays out" do
    options = helper.timeframe_options(build(:task), spaces)

    expect(options.scan("<option").length).to eq(Timeframe::DISPLAY_NAMES.size)
  end

  it "names the inbox with a dash" do
    options = helper.timeframe_options(build(:task), spaces)

    expect(options).to include(%(<option selected="selected" value="inbox">-))
  end

  it "selects the timeframe the task is filed under" do
    options = helper.timeframe_options(build(:task, timeframe: "week"), spaces)

    expect(options).to include(%(<option selected="selected" value="week">))
  end

  it "says how much room another timeframe has left" do
    options = helper.timeframe_options(build(:task), spaces)

    expect(options).to include("This Week (40)")
  end

  it "leaves the room off the timeframe the task is already in" do
    options = helper.timeframe_options(build(:task, timeframe: "week"), spaces)

    expect(options).to include(">This Week</option>")
  end

  it "leaves the room off an open ended timeframe" do
    options = helper.timeframe_options(build(:task, timeframe: "week"), spaces)

    expect(options).to include(">This Decade</option>")
  end

  it "rules out a timeframe without room for the task" do
    options = helper.timeframe_options(build(:task), spaces)

    expect(options).to include(%(<option disabled="disabled" value="today">))
  end

  def spaces
    Timeframe::DISPLAY_NAMES.index_with { |name| room_in(name) }
  end

  # today is too full for the task, the week has room to spare
  def room_in(name)
    return 5 if name == "today"
    return 40 if name == "week"

    Float::INFINITY
  end
end
