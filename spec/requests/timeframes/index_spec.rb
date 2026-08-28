# frozen_string_literal: true

RSpec.describe TimeframesController, "#index" do
  def stat_for(user, value, timestamp)
    Stat.create!(name: "seconds-completed", user:, value:, timestamp:)
  end

  it "tells the user how much they get through in a day" do
    user = create(:user)
    stat_for(user, 1.hour, 1.week.ago)
    login_as(user)

    get "/timeframes"

    expect(rendered).to have_text("Median Productivity: 1 hour per day")
  end

  it "files a task under the timeframe it belongs to" do
    task = create(:task, timeframe: "week", title: "wash the dishes")
    login_as(task.user)

    get "/timeframes"

    expect(rendered).to have_css("#week", text: "wash the dishes")
  end

  it "puts a task with no timeframe in the inbox" do
    task = create(:task, title: "wash the dishes")
    login_as(task.user)

    get "/timeframes"

    expect(rendered).to have_css("#inbox", text: "wash the dishes")
  end

  it "marks a pending task as waiting" do
    travel_to(mid_morning)
    task = create(:task, timeframe: "today", release_at: 1.hour.from_now)
    login_as(task.user)

    get "/timeframes"

    expect(rendered).to have_css("#today .tasks-table__row--pending")
  end

  it "shows how full a timeframe is against what it can hold" do
    user = create(:user)
    stat_for(user, 1.hour, 1.week.ago)
    create(:task, user:, timeframe: "today", estimate_seconds: 6.minutes)
    login_as(user)

    get "/timeframes"

    expect(rendered)
      .to have_css("#today h2", text: "Today 6/60", normalize_ws: true)
  end

  it "leaves out a timeframe with nothing in it" do
    login_as(create(:user))

    get "/timeframes"

    expect(rendered).to have_no_css("#today")
  end

  def mid_morning
    Time.zone.parse("June 1, 2020 09:00:00")
  end
end
