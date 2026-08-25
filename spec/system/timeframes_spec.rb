# frozen_string_literal: true

RSpec.describe "timeframes" do
  let(:user) { create(:user) }

  def tomorrow(&)
    travel(1.day, &)
  end

  def create_stats
    create(:stat, user:, timestamp: 3.days.ago, value: 3600)
    create(:stat, user:, timestamp: 4.days.ago, value: 4000)
  end

  def visit_timeframes(**task_attributes)
    system_login_as(user)
    travel_to(Time.zone.parse("2014/04/16"))
    create_stats
    task = create(:task, user:, **task_attributes)
    sidebar.click("TIMEFRAMES")

    task
  end

  def priority_select(task)
    task_row(task.title).first("select")
  end

  it "displays the median productivity of the user" do
    add_task("do laundry")
    add_task("feed dog ~5m")
    add_task("read feeds ~1h")
    add_task("clean dishes")

    tomorrow do
      sidebar.click("TIMEFRAMES")
      expect(page).to have_text("Median Productivity: 1 hour per day")
    end

    sidebar.click("FOCUS")
    expect(page).to have_task("do laundry")
    click_button "Done"
    expect(page).to have_task("feed dog")
    tomorrow do
      sidebar.click("TIMEFRAMES")
      expect(page).to have_text("Median Productivity: 30 minutes per day")
    end

    sidebar.click("FOCUS")
    expect(page).to have_task("feed dog")
    click_button "Done"
    expect(page).to have_task("read feeds")
    tomorrow do
      sidebar.click("TIMEFRAMES")
      expect(page).to have_text("Median Productivity: 35 minutes per day")
    end

    sidebar.click("FOCUS")
    expect(page).to have_task("read feeds")
    postpone_button.click
    expect(page).to have_task("clean dishes")
    tomorrow do
      sidebar.click("TIMEFRAMES")
      expect(page).to have_text("Median Productivity: 35 minutes per day")
    end

    refresh

    sidebar.click("FOCUS")
    expect(page).to have_task("clean dishes")
    click_button "Done"
    expect(page).to have_task("read feeds")
    tomorrow do
      sidebar.click("TIMEFRAMES")
      expected_text = "Median Productivity: 1 hour, 5 minutes per day"
      expect(page).to have_text(expected_text)
    end

    sidebar.click("FOCUS")

    expect(page).to have_tag("Untagged (1)")
  end

  it "displays the timeframes for the user" do
    system_login_as(user)

    expect(page).to have_no_task

    travel_to(Time.zone.parse("2014/04/16"))

    create(:stat, user:, timestamp: 3.days.ago, value: 3600)
    create(:stat, user:, timestamp: 4.days.ago, value: 4000)

    sidebar.click("TIMEFRAMES")

    expect(page).to have_text("Median Productivity")

    task_1 = create(:task, user:)
    task_2 = create(:task, user:, estimate_seconds: 365)

    refresh

    expect(page).to have_no_css(".timeframe")
    within(".inbox#inbox") do
      expect(find("h2", text: /\AInbox 36\/∞\z/)).to be_truthy
      task_row(task_1.title).select("This Week", from: "task[timeframe]")

      expect(find("h2", text: /\AInbox 6\/∞\z/)).to be_truthy
      task_row(task_2.title).select("Today", from: "task[timeframe]")
    end

    expect(page).to have_no_css("#inbox")

    within(".timeframe#today") do
      expect(find("h2", text: /\AToday 6\/63\z/)).to be_truthy
      expect(find("tbody > tr .task-input").value).to eq(task_2.title)
    end

    within(".timeframe#week") do
      expect(find("h2", text: /\AThis Week 30\/95\z/)).to be_truthy
      task_row(task_1.title).select("Today", from: "task[timeframe]")
    end

    expect(page).to have_no_css(".timeframe#week")

    within(".timeframe#today") do
      expect(find("h2", text: /\AToday 36\/63\z/)).to be_truthy
      task_row(task_1.title).select("-", from: "task[timeframe]")

      expect(find("h2", text: /\AToday 6\/63\z/)).to be_truthy
      task_row(task_2.title).select("-", from: "task[timeframe]")
    end

    expect(page).to have_no_css(".timeframe")

    within(".inbox#inbox") do
      expect(all(".task-input").map(&:value)).to eq [task_1.title, task_2.title]
    end

    visit "/"

    expect(page).to have_tag("Needs Estimate (1)")
  end

  it "renders a pending task as pending in its timeframe" do
    task = visit_timeframes(
      timeframe: "today",
      release_at: Time.zone.parse("2014/04/16 18:00"),
    )

    within(".timeframe#today") do
      expect(find("tbody > tr .task-input").value).to eq(task.title)
      expect(page).to have_css(".tasks-table__row--pending")
      expect(page).to have_button("UNDO")
    end
  end

  it "releases a pending task when UNDO is clicked" do
    visit_timeframes(
      timeframe: "today",
      release_at: Time.zone.parse("2014/04/16 18:00"),
    )

    within(".timeframe#today") { click_button("UNDO") }

    expect(page).to have_no_css(".tasks-table__row--pending")
    expect(page).to have_css(".timeframe#today")
  end

  it "marks a task done from its timeframe row" do
    task = visit_timeframes(timeframe: "today")

    task_row(task.title).click_button("DONE")

    expect(page).to have_no_task(task.title)
  end

  it "deletes a task from its timeframe row" do
    task = visit_timeframes(timeframe: "today")

    accept_confirm { task_row(task.title).click_button("DELETE") }

    expect(page).to have_no_task(task.title)
  end

  it "updates a task's priority from its timeframe row" do
    task = visit_timeframes(timeframe: "today")

    priority_select(task).find(:option, "1").select_option

    expect(page).to have_css(".tasks-table__row--priority-1")

    refresh

    expect(priority_select(task).value).to eq("1")
  end
end
