RSpec.describe FreeAccountsController, '#create' do

  let(:valid_params) { attributes_for(:free_account) }
  let(:user) { create(:user) }

  context 'when the account is valid' do
    context 'when user is already a guest' do
      before(:each) do
        login_as(user)
      end

      it 'adds the account to the current user' do
        old_account = user.account
        post(:create, free_account: valid_params)
        expect(user.reload.account).not_to eq old_account
        expect(user.account).to be_instance_of(FreeAccount)
      end

      it 'flashes a notice' do
        post(:create, free_account: valid_params)
        expect(flash[:notice]).to eq 'Signed up!'
      end

      it 'redirects to root' do
        post(:create, free_account: valid_params)
        expect(response).to redirect_to root_path
      end
    end

    context 'when user is a new guest' do
      it 'logs in the user' do
        post(:create, free_account: valid_params)
        expect(session[:user_id]).not_to be_nil
      end
    end
  end

  context 'when the account is invalid' do
    before(:each) do
      login_as(user)
      expect_any_instance_of(FreeAccount).to receive(:save).and_return(false)
      post(:create, free_account: valid_params)
    end

    it 'flashes an error' do
      expect(flash[:error]).to match(/there was a problem/i)
    end

    it 'renders the new template' do
      expect(response.body).to include('<h1>Sign Up</h1>')
    end
  end

end
