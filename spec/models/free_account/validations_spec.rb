require 'spec_helper'

describe FreeAccount, 'validations' do

  it { should validate_presence_of(:email) }

  it do
    create(:free_account)
    should validate_uniqueness_of(:email).case_insensitive
  end

end
