RSpec.describe SessionsController, '#create' do

  let(:user) { create(:user) }
  let(:params) { { email: 'some_email', password: 'some_password' } }

  context 'when a profile is found' do
    before(:each) do
      fake_profile = double(user: user)
      expect(Profile).to receive(:authenticate)
        .with('some_email', 'some_password')
        .and_return(fake_profile)
    end

    context 'when using a guest account' do
      it 'absorbs the current user into the logged in user' do
        user_2 = create(:user)
        session[:user_id] = user_2.id
        expect(user).to receive(:absorb).with(instance_of(User))
        post(:create, params)
      end
    end

    it 'sets the current user to the user' do
      post(:create, params)
      expect(session[:user_id]).to eq user.id
    end

    it 'redirects to root path' do
      post(:create, params)
      expect(response).to redirect_to root_path
    end

    it 'flashes a success message' do
      post(:create, params)
      expect(flash[:notice]).to match(/logged in/i)
    end
  end

  context 'when a profile is not found' do
    before(:each) do
      expect(Profile).to receive(:authenticate).and_return(nil)
    end

    it 'flashes an error message' do
      post(:create)
      expect(flash[:error]).to match(/invalid email or password/i)
    end

    it 'renders the "new" template' do
      post(:create)
      expect(response).to redirect_to('/sessions/new')
    end
  end

end
