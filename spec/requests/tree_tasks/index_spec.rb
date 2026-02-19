# frozen_string_literal: true

RSpec.describe TreeTasksController, "#index" do
  it "renders a react container" do
    get "/tree_tasks"

    expect(rendered).to have_css("#app-base")
  end
end
