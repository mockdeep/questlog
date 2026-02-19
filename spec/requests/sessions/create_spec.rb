# frozen_string_literal: true

RSpec.describe SessionsController, "#create" do
  let(:user) { create(:user) }
  let(:valid_params) { { session: { email: user.account.email, password: user.account.password } } }

  context "when a profile is found" do
    context "when another user is already logged in" do
      it "absorbs the current user into the logged in user" do
        other_user = create(:user)
        login_as(other_user)
        task = create(:task, user: other_user)

        post "/session", params: valid_params

        expect(task.reload.user).to eq user
      end
    end

    it "sets the current user to the user" do
      post "/session", params: valid_params
      expect(session[:user_id]).to eq user.id
    end

    it "redirects to root path" do
      post "/session", params: valid_params
      expect(response).to redirect_to root_path
    end

    it "flashes a success message" do
      post "/session", params: valid_params
      expect(flash[:notice]).to match(/logged in/i)
    end
  end

  context "when a profile is not found" do
    let(:invalid_params) { { session: { email: "wrong@email.com", password: "wrong" } } }

    it "flashes an error message" do
      post "/session", params: invalid_params
      expect(flash[:error]).to match(/invalid email or password/i)
    end

    it 'renders the "new" template' do
      post "/session", params: invalid_params
      expect(response).to redirect_to(new_session_path)
    end
  end
end
