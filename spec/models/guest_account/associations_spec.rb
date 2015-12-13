RSpec.describe GuestAccount, 'associations' do

  it { is_expected.to have_one(:user) }

end
