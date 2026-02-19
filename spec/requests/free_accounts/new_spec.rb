# frozen_string_literal: true

RSpec.describe FreeAccountsController, "#new" do
  it "renders a form to sign up for a new account" do
    get "/free_accounts/new"

    expect(response.body).to match(/Sign Up/)
  end
end
