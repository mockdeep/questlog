RSpec.describe User, '#admin?' do

  it 'returns false when there is no account' do
    user = User.new
    expect(user.account).to be nil
    expect(user.admin?).to be false
  end

  it 'returns false when account is guest' do
    user = User.new(account: GuestAccount.new)
    expect(user.account).not_to be nil
    expect(user.admin?).to be false
  end

  it 'returns false when account is free and email is not admin' do
    user = User.new(account: FreeAccount.new(email: 'spam@gmail.com'))
    expect(user.admin?).to be false
  end

  it 'returns true when account is free and email is admin' do
    user = User.new(account: FreeAccount.new(email: 'lobatifricha@gmail.com'))
    expect(user.admin?).to be true
  end

end
