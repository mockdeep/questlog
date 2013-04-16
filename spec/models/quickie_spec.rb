require 'spec_helper'

describe Quickie do

  describe 'associations' do
    it { should belong_to(:user) }
    it { should have_many(:taggings).dependent(:destroy) }
    it { should have_many(:contexts).through(:taggings) }
  end

  describe '#valid?' do
    it { should validate_presence_of(:title) }
    it { should validate_presence_of(:user) }
  end

end
