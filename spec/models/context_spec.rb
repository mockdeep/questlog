require 'spec_helper'

describe Context do
  let(:context) { create(:context) }

  describe 'associations' do
    it { should belong_to(:user) }

    it { should have_many(:taggings) }
    it { should have_many(:quickies).through(:taggings) }
  end

  describe '#quickies_count' do
    context 'when a quickie is added to the context' do
      it 'is incremented' do
        expect(context.quickies_count).to eq 0
        quickie = create(:quickie)
        context.quickies << quickie
        expect(context.quickies_count).to eq 1
      end
    end

    context 'when a context is added to the quickie' do
      it 'is incremented' do
        quickie = create(:quickie, context_ids: [context.id])
        expect(context.reload.quickies_count).to eq 1
      end
    end

    context 'when a quickie is marked complete' do
      it 'is decremented' do
        quickie = create(:quickie, context_ids: [context.id])
        expect(context.reload.quickies_count).to eq 1
        quickie.update_attributes(done: true)
        expect(context.reload.quickies_count).to eq 0
      end
    end
  end

  describe '#valid?' do
    it { should validate_presence_of(:name) }
    it { should validate_presence_of(:user) }
  end

end
