# frozen_string_literal: true

RSpec.describe "GET /account/remove" do
  context "when the user is a guest" do
    it "redirects to the login page" do
      get "/account/remove"

      expect(response).to redirect_to(new_session_path)
    end

    it "returns to the remove page after login" do
      get "/account/remove"

      expect(session[:return_path]).to eq("/account/remove")
    end
  end

  context "when the user has an account" do
    it "shows the account email" do
      user = create(:user)
      login_as(user)

      get "/account/remove"

      expect(rendered).to have_css("strong", text: user.email)
    end

    it "shows a button to delete the account" do
      login_as(create(:user))

      get "/account/remove"

      expect(rendered).to have_button("Permanently Delete Account")
    end

    it "links back to the account page" do
      login_as(create(:user))

      get "/account/remove"

      expect(rendered).to have_link("Cancel", href: "/account")
    end
  end
end
