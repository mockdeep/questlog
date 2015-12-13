RSpec.describe FreeAccount, '#associations' do

  it { is_expected.to have_one(:user) }

end
