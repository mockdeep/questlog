# frozen_string_literal: true

RSpec.describe "GET /account" do
  context "when the user is a guest" do
    it "redirects to the login page" do
      get "/account"

      expect(response).to redirect_to(new_session_path)
    end

    it "returns to the account page after login" do
      get "/account"

      expect(session[:return_path]).to eq("/account")
    end
  end

  context "when the user has an account" do
    it "shows the account email" do
      user = create(:user)
      login_as(user)

      get "/account"

      expect(rendered).to have_text(user.email)
    end

    it "shows a free plan when the user has not paid" do
      login_as(create(:user))

      get "/account"

      expect(rendered).to have_css("dd", text: "Free")
    end

    it "shows a paid plan when the user has paid" do
      login_as(create(:user, customer_id: "cus_123"))

      get "/account"

      expect(rendered).to have_css("dd", text: "Paid")
    end

    it "links to the remove page" do
      login_as(create(:user))

      get "/account"

      expect(rendered).to have_link("Delete account", href: "/account/remove")
    end
  end
end
