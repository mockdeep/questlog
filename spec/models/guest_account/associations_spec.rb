require 'spec_helper'

describe GuestAccount, 'associations' do

  it { is_expected.to have_one(:user) }

end
