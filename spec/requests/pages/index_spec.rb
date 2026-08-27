# frozen_string_literal: true

RSpec.describe PagesController, "#index" do
  it "renders an element for react" do
    get "/"

    expect(rendered).to have_css("#app-base")
  end

  it "renders the user's tasks onto the react mount element" do
    task = create(:task, title: "wash the dishes")
    login_as(task.user)

    get "/"

    expect(mount_value("data-react-tasks-value").pluck("title"))
      .to eq(["wash the dishes"])
  end

  it "renders the user's tags onto the react mount element" do
    login_as(create(:user))

    get "/"

    expect(mount_value("data-react-tags-value").pluck("name"))
      .to eq(["All", "Untagged", "Needs Estimate"])
  end

  def mount_value(attribute)
    element = rendered.find("[data-controller='react']")

    JSON.parse(element[attribute])
  end
end
