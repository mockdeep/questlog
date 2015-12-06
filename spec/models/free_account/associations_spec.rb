require 'spec_helper'

describe FreeAccount, '#associations' do

  it { is_expected.to have_one(:user) }

end
