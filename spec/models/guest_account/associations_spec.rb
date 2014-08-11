require 'spec_helper'

describe GuestAccount, 'associations' do

  it { should have_one(:user) }

end
