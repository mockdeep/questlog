# frozen_string_literal: true

RSpec.describe TagsController, "#show" do
  it "shows the next task carrying the tag" do
    task = create(:task, title: "wash the dishes", tag_names: ["home"])
    create(:task, user: task.user, title: "feed the dog")
    login_as(task.user)

    get "/tags/home"

    expect(rendered).to have_css("#task", text: "wash the dishes")
  end

  it "singles out the tag being looked at" do
    task = create(:task, tag_names: ["home"])
    login_as(task.user)

    get "/tags/home"

    expect(rendered).to have_link("home (1)", class: "active")
  end

  it "stops singling out All" do
    task = create(:task, tag_names: ["home"])
    login_as(task.user)

    get "/tags/home"

    expect(rendered).to have_no_link("All (1)", class: "active")
  end
end
