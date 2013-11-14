require 'spec_helper'

describe FreeAccount do

  subject { build(:free_account) }

  describe 'associations' do
    it { should have_one(:user) }
  end

  describe 'validations' do
    it { should validate_presence_of(:email) }

    it do
      create(:free_account)
      should validate_uniqueness_of(:email).case_insensitive
    end
  end

end
