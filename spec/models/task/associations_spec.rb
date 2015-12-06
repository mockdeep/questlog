require 'spec_helper'

describe Task, 'associations' do

  it { is_expected.to belong_to(:user) }
  it { is_expected.to have_many(:taggings).dependent(:destroy) }
  it { is_expected.to have_many(:tags).through(:taggings) }

end
