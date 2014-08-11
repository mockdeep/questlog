require 'spec_helper'

describe UsersController, '#update' do

  let(:user) { create(:user) }

  before(:each) do
    login_as(user)
  end

  it 'updates the current user' do
    receive_expected = receive(:update_attributes!).with('mode' => 'advanced')
    expect_any_instance_of(User).to receive_expected
    put(:update, id: user.id, user: { mode: 'advanced' })
  end

  it 'redirects to root path' do
    put(:update, id: user.id, user: { mode: 'advanced' })
    expect(response).to redirect_to(root_path)
  end
end
