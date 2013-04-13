require 'spec_helper'

describe Tag do

  describe 'associations' do
    it { should belong_to(:user) }

    it { should have_many(:taggings) }
    it { should have_many(:quickies).through(:taggings) }
  end

  describe '#quickies_count' do
    it 'returns the number of associated quickies' do
      tag = FactoryGirl.create(:tag)
      expect(tag.quickies_count).to eq 0
      quickie = FactoryGirl.create(:quickie)
      tag.quickies << quickie
      expect(tag.quickies_count).to eq 1
    end
  end

  describe '#valid?' do
    it { should validate_presence_of(:name) }
  end

end
