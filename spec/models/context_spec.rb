require 'spec_helper'

describe Context do

  describe 'associations' do
    it { should belong_to(:user) }

    it { should have_many(:taggings) }
    it { should have_many(:quickies).through(:taggings) }
  end

  describe '#quickies_count' do
    it 'returns the number of associated quickies' do
      context = FactoryGirl.create(:context)
      expect(context.quickies_count).to eq 0
      quickie = FactoryGirl.create(:quickie)
      context.quickies << quickie
      expect(context.quickies_count).to eq 1
    end
  end

  describe '#valid?' do
    it { should validate_presence_of(:name) }
    it { should validate_presence_of(:user) }
  end

end
