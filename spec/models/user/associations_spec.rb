require 'spec_helper'

describe User, 'associations' do

  it { is_expected.to belong_to(:account).dependent(:destroy) }

  it { is_expected.to have_many(:stats).dependent(:destroy) }
  it { is_expected.to have_many(:tasks).dependent(:destroy) }
  it { is_expected.to have_many(:tags).dependent(:destroy) }

end
