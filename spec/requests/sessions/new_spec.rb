# frozen_string_literal: true

RSpec.describe SessionsController, "#new" do
  it "renders the new session page" do
    get "/session/new"

    expect(rendered).to have_field("Email")
    expect(rendered).to have_field("Password")
  end
end
