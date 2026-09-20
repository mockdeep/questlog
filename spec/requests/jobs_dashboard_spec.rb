# frozen_string_literal: true

RSpec.describe "Jobs dashboard" do
  it "is not found for anonymous visitors" do
    expect { get("/jobs") }.to raise_error(ActionController::RoutingError)
  end

  it "is not found for signed-in non-admins" do
    login_as(create(:user))

    expect { get("/jobs") }.to raise_error(ActionController::RoutingError)
  end

  it "renders for admins" do
    account = create(:free_account, email: "lobatifricha@gmail.com")
    login_as(create(:user, account:))

    get("/jobs")

    expect(response).to have_http_status(:ok)
  end
end
