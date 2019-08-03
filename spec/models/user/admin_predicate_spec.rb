RSpec.describe User, '#admin?' do

  it 'returns false when there is no account' do
    user = described_class.new

    expect(user.account).to be nil
    expect(user.admin?).to be false
  end

  it 'returns false when account is guest' do
    user = described_class.new(account: GuestAccount.new)

    expect(user.account).not_to be nil
    expect(user.admin?).to be false
  end

  it 'returns false when account is free and email is not admin' do
    user = described_class.new(account: FreeAccount.new(email: 'spam@mail.com'))

    expect(user.admin?).to be false
  end

  it 'returns true when account is free and email is admin' do
    admin_email = 'lobatifricha@gmail.com'
    user = described_class.new(account: FreeAccount.new(email: admin_email))

    expect(user.admin?).to be true
  end

end
