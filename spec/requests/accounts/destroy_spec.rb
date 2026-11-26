# frozen_string_literal: true

RSpec.describe "DELETE /account" do
  context "when the user is a guest" do
    it "redirects to the login page" do
      delete("/account")

      expect(response).to redirect_to(new_session_path)
    end

    it "returns to the account page after login" do
      delete("/account")

      expect(session[:return_path]).to eq("/account")
    end

    it "does not delete any users" do
      create(:user)

      expect { delete("/account") }.not_to(change(User, :count))
    end
  end

  context "when the user has an account" do
    it "deletes the user" do
      login_as(create(:user))

      expect { delete("/account") }.to change(User, :count).by(-1)
    end

    it "deletes the user's account record" do
      login_as(create(:user))

      expect { delete("/account") }.to change(FreeAccount, :count).by(-1)
    end

    it "deletes the user's tasks" do
      user = create(:user)
      create(:task, user:)
      login_as(user)

      expect { delete("/account") }.to change(Task, :count).by(-1)
    end

    it "logs the user out" do
      login_as(create(:user))
      delete("/account")

      expect(session[:user_id]).to be_nil
    end

    it "redirects to the root page" do
      login_as(create(:user))
      delete("/account")

      expect(response).to redirect_to(root_path)
    end

    it "flashes a notice" do
      login_as(create(:user))
      delete("/account")

      expect(flash[:notice]).to eq("Your account has been deleted.")
    end
  end
end
