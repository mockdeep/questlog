require 'spec_helper'

describe Task, 'associations' do

  it { should belong_to(:user) }
  it { should have_many(:taggings).dependent(:destroy) }
  it { should have_many(:tags).through(:taggings) }

end
