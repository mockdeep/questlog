RSpec.describe FreeAccountsController, '#new' do
  it 'renders a form to sign up for a new account' do
    get(:new)

    expect(response.body).to match(/Sign Up/)
  end
end
