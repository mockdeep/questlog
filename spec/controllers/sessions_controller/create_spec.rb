RSpec.describe SessionsController, '#create' do
  let(:user) { create(:user) }
  let(:valid_attributes) { { email: 'some_email', password: 'some_password' } }

  context 'when a profile is found' do
    before(:each) do
      fake_profile = double(user:)
      expect(Profile).to receive(:authenticate)
        .with('some_email', 'some_password')
        .and_return(fake_profile)
    end

    context 'when using a guest account' do
      it 'absorbs the current user into the logged in user' do
        user_2 = create(:user)
        session[:user_id] = user_2.id
        allow(user).to receive(:absorb)
        post(:create, params: { session: valid_attributes })
        expect(user).to have_received(:absorb).with(instance_of(User))
      end
    end

    it 'sets the current user to the user' do
      post(:create, params: { session: valid_attributes })
      expect(session[:user_id]).to eq user.id
    end

    it 'redirects to root path' do
      post(:create, params: { session: valid_attributes })
      expect(response).to redirect_to root_path
    end

    it 'flashes a success message' do
      post(:create, params: { session: valid_attributes })
      expect(flash[:notice]).to match(/logged in/i)
    end
  end

  context 'when a profile is not found' do
    before(:each) do
      expect(Profile).to receive(:authenticate).and_return(nil)
    end

    it 'flashes an error message' do
      post(:create, params: { session: valid_attributes })
      expect(flash[:error]).to match(/invalid email or password/i)
    end

    it 'renders the "new" template' do
      post(:create, params: { session: valid_attributes })
      expect(response).to redirect_to(new_session_path)
    end
  end
end
