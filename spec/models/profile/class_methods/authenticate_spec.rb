RSpec.describe Profile, '.authenticate' do

  let(:account) { create(:free_account) }
  let(:password) { account.password }
  let(:email) { account.email }

  it 'returns the account when authentication is successful' do
    expect(described_class.authenticate(email, password)).to eq account
  end

  it 'returns nil when account is not found' do
    expect(described_class.authenticate('bad@email.com', password)).to be nil
  end

  it 'returns false when account fails to authenticate' do
    expect(Profile.authenticate(email, 'bad password')).to be false
  end

  it 'downcases the given email' do
    expect(Profile.authenticate(email.upcase, password)).to eq account
  end

end
