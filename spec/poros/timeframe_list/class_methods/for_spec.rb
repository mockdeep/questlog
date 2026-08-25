# frozen_string_literal: true

RSpec.describe TimeframeList, ".for" do
  it "puts a task with no timeframe in the inbox" do
    task = create(:task)

    expect(names_with_tasks(task.user)).to eq(["inbox"])
  end

  it "puts a task in the timeframe it is filed under" do
    task = create(:task, timeframe: "week")

    expect(names_with_tasks(task.user)).to eq(["week"])
  end

  it "leaves a task filed under a century off the page" do
    task = create(:task, timeframe: "century")

    expect(names_with_tasks(task.user)).to eq([])
  end

  it "keeps a pending task apart from the current ones" do
    travel_to(monday)
    task = create(:task, timeframe: "today", release_at: 1.hour.from_now)

    expect(timeframe_for(task.user, "today").pending_tasks).to eq([task])
  end

  it "moves a pending task to the timeframe it is released in" do
    travel_to(monday)
    task = create(:task, timeframe: "today", release_at: 2.days.from_now)

    expect(names_with_tasks(task.user)).to eq(["week"])
  end

  it "keeps a pending task in an open ended timeframe" do
    travel_to(monday)
    task = create(:task, timeframe: "decade", release_at: 20.years.from_now)

    expect(names_with_tasks(task.user)).to eq(["decade"])
  end

  it "totals the estimates of the tasks in a timeframe" do
    task = create(:task, timeframe: "today", estimate_seconds: 365)
    create(:task, user: task.user, timeframe: "today")

    expect(timeframe_for(task.user, "today").minute_total).to eq(36)
  end

  it "caps each timeframe by a share of the user's productivity" do
    travel_to(moon_landing)

    expect(minute_maxes(create(:user))).to eq(expected_minute_maxes)
  end

  def timeframes_for(user)
    described_class.for(user:, median_productivity: 3.hours)
  end

  def timeframe_for(user, name)
    timeframes_for(user).detect { |timeframe| timeframe.name == name }
  end

  def names_with_tasks(user)
    timeframes_for(user).reject { |timeframe| timeframe.tasks.empty? }
                        .map(&:name)
  end

  def minute_maxes(user)
    timeframes_for(user).to_h { |frame| [frame.name.to_sym, frame.minute_max] }
  end

  # matches the numbers the javascript timeframe store used to produce
  def expected_minute_maxes
    {
      inbox: nil,
      today: 180,
      week: 540,
      month: 450,
      quarter: 5490,
      year: 8280,
      lustrum: nil,
      decade: nil,
    }
  end

  # a Sunday, so the week runs another six days
  def moon_landing
    Time.zone.parse("July 20, 1969 00:20:18")
  end

  def monday
    Time.zone.parse("June 1, 2020 09:00:00")
  end
end
