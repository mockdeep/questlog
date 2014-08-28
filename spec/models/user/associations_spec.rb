require 'spec_helper'

describe User, 'associations' do

  it { should belong_to(:account).dependent(:destroy) }

  it { should have_many(:tasks).dependent(:destroy) }
  it { should have_many(:contexts).dependent(:destroy) }

end
