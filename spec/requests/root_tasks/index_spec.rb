# frozen_string_literal: true

RSpec.describe RootTasksController, "#index" do
  it "renders a react container" do
    get "/root_tasks"

    expect(rendered).to have_css("#app-base")
  end
end
