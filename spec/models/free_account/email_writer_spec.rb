RSpec.describe FreeAccount, '#email=' do

  let(:account) { described_class.new }

  it 'downcases the email when present' do
    account.email = 'BAD@bOOgers.COM'

    expect(account.email).to eq 'bad@boogers.com'
  end

  it 'sets the email to nil when given nil' do
    account.email = 'BAD@bOOgers.COM'
    account.email = nil

    expect(account.email).to be nil
  end

end
