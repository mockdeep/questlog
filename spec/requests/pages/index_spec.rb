# frozen_string_literal: true

RSpec.describe PagesController, "#index" do
  it "shows the task to work on next" do
    task = create(:task, title: "wash the dishes")
    login_as(task.user)

    get "/"

    expect(rendered).to have_css("#task", text: "wash the dishes")
  end

  it "says so when there is nothing to work on" do
    login_as(create(:user))

    get "/"

    expect(rendered).to have_text("No tasks!")
  end

  it "lists the tags claiming a task" do
    task = create(:task, estimate_seconds: 1.hour, tag_names: ["home"])
    login_as(task.user)

    get "/"

    expect(rendered.all(".tag-buttons a").map(&:text))
      .to eq(["All (1)", "home (1)"])
  end

  it "singles out All when no tag is being looked at" do
    task = create(:task, tag_names: ["home"])
    login_as(task.user)

    get "/"

    expect(rendered).to have_link("All (1)", class: "active")
  end

  it "leaves out the tags no task claims" do
    task = create(:task, estimate_seconds: 1.hour)
    login_as(task.user)

    get "/"

    expect(rendered).to have_no_link("Needs Estimate (0)")
  end
end
