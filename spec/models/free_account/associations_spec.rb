require 'spec_helper'

describe FreeAccount, '#associations' do

  it { should have_one(:user) }

end
