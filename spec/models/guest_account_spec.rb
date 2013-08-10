require 'spec_helper'

describe GuestAccount do

  describe 'associations' do
    it { should have_one(:user) }
  end

end
