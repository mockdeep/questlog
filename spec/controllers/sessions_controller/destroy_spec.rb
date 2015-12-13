RSpec.describe SessionsController, '#destroy' do

  let(:user) { create(:user) }

  before(:each) do
    login_as(user)
    delete(:destroy)
  end

  it 'clears the session' do
    expect(session[:user_id]).to be_nil
  end

  it 'sets a flash message' do
    expect(flash[:notice]).to match(/logged out/i)
  end

end
