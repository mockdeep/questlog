# frozen_string_literal: true

RSpec.describe TimeframesController, "#index" do
  let(:user) { create(:user) }
  let(:stat_params) { { name: "seconds-completed", user: } }

  before(:each) { login_as(user) }

  it "returns the median productivity for the current user" do
    Stat.create!(stat_params.merge(value: 35.minutes, timestamp: 1.month.ago))
    Stat.create!(stat_params.merge(value: 1.hour, timestamp: 1.week.ago))
    get "/timeframes", as: :json
    meta = response.parsed_body["meta"]
    expect(meta).to include("medianProductivity" => 1.hour)
    Stat.create!(stat_params.merge(value: 35.minutes, timestamp: 5.days.ago))
    get "/timeframes", as: :json
    meta = response.parsed_body["meta"]
    expect(meta).to include("medianProductivity" => 2850)
  end

  it "returns the inbox timeframe for the current user" do
    task = create(:task, user:)
    serial_task = hash_including("id" => task.id, "timeframe" => nil)

    get "/timeframes", as: :json

    expect(timeframe("inbox")).to include("currentTasks" => [serial_task])
  end

  it "returns every timeframe the page lays out" do
    get "/timeframes", as: :json

    names = response.parsed_body["data"].pluck("name")

    expect(names).to eq(Timeframe::DISPLAY_NAMES)
  end

  it "files a task under the timeframe it belongs to" do
    task = create(:task, user:, timeframe: "week")
    serial_task = hash_including("id" => task.id, "timeframe" => "week")

    get "/timeframes", as: :json

    expect(timeframe("week")).to include("currentTasks" => [serial_task])
  end

  it "keeps a pending task apart from the current ones" do
    task = create(:task, user:, timeframe: "today", release_at: 1.hour.from_now)
    serial_task = hash_including("id" => task.id)

    get "/timeframes", as: :json

    expect(timeframe("today")).to include("pendingTasks" => [serial_task])
  end

  it "totals the estimated minutes of a timeframe's tasks" do
    create(:task, user:, timeframe: "week", estimate_seconds: 365)

    get "/timeframes", as: :json

    expect(timeframe("week")).to include("minuteTotal" => 6)
  end

  it "leaves an open ended timeframe without a maximum" do
    get "/timeframes", as: :json

    expect(timeframe("inbox")).to include("minuteMax" => nil)
  end

  it "caps a bounded timeframe by the user's productivity" do
    Stat.create!(stat_params.merge(value: 1.hour, timestamp: 1.week.ago))

    get "/timeframes", as: :json

    expect(timeframe("today")).to include("minuteMax" => 60)
  end

  def timeframe(name)
    response.parsed_body["data"].detect { |frame| frame["name"] == name }
  end
end
