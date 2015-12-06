require 'spec_helper'

describe FreeAccount, 'validations' do

  it { is_expected.to validate_presence_of(:email) }

  it do
    create(:free_account)
    is_expected.to validate_uniqueness_of(:email).case_insensitive
  end

end
