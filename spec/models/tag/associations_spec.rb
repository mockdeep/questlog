require 'spec_helper'

describe Tag, 'associations' do

  it { should belong_to(:user) }

  it { should have_many(:taggings).dependent(:destroy) }
  it { should have_many(:tasks).through(:taggings) }

end
