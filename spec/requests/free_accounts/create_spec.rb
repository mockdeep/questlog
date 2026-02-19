# frozen_string_literal: true

RSpec.describe FreeAccountsController, "#create" do
  let(:valid_attributes) { attributes_for(:free_account) }

  context "when the account is valid" do
    context "when user is already a guest" do
      before(:each) do
        post "/tasks", params: { task: attributes_for(:task) }
      end

      it "adds the account to the current user" do
        guest_user = User.find(session[:user_id])
        old_account = guest_user.account
        post "/free_accounts", params: { free_account: valid_attributes }
        expect(guest_user.reload.account).not_to eq old_account
        expect(guest_user.account).to be_instance_of(FreeAccount)
      end

      it "flashes a notice" do
        post "/free_accounts", params: { free_account: valid_attributes }
        expect(flash[:notice]).to eq "Signed up!"
      end

      it "redirects to root" do
        post "/free_accounts", params: { free_account: valid_attributes }
        expect(response).to redirect_to root_path
      end
    end

    context "when user is a new guest" do
      it "logs in the user" do
        post "/free_accounts", params: { free_account: valid_attributes }
        expect(session[:user_id]).not_to be_nil
      end
    end
  end

  context "when the account is invalid" do
    before(:each) do
      post "/tasks", params: { task: attributes_for(:task) }
      fake_result = ActionResult.new(success: false, object: FreeAccount.new)
      expect(FreeAccount::Create).to receive(:call).and_return(fake_result)
      post "/free_accounts", params: { free_account: valid_attributes }
    end

    it "flashes an error" do
      expect(flash[:error]).to match(/there was a problem/i)
    end

    it "renders the new template" do
      expect(response.body).to include("<h1>Sign Up</h1>")
    end
  end
end
