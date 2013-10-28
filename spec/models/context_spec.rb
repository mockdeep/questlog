require 'spec_helper'

describe Context do
  let(:context) { create(:context) }

  describe 'associations' do
    it { should belong_to(:user) }

    it { should have_many(:taggings) }
    it { should have_many(:quickies).through(:taggings) }
  end

  describe '#valid?' do
    it { should validate_presence_of(:name) }
    it { should validate_presence_of(:user) }

    it { should validate_uniqueness_of(:name).scoped_to(:user_id) }
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

    context 'when a quickie is destroyed' do
      it 'is decremented' do
        quickie = create(:quickie, context_ids: [context.id])
        quickie.destroy
        expect(context.reload.quickies_count).to eq 0
      end
    end

    context 'when a quickie is marked complete and then incomplete' do
      it 'is decremented and then incremented' do
        quickie = create(:quickie, context_ids: [context.id])
        expect(context.reload.quickies_count).to eq 1
        quickie.update_attributes(done: true)
        expect(context.reload.quickies_count).to eq 0
        quickie.update_attributes(done: false)
        expect(context.reload.quickies_count).to eq 1
      end
    end

    context 'when there are more than one quickie and more than one context' do
      it 'increments and decrements properly' do
        quickie1 = create(:quickie)
        quickie2 = create(:quickie)
        context1 = create(:context)
        context2 = create(:context)
        expect(context1.quickies_count).to eq 0
        expect(context2.quickies_count).to eq 0
        context1.quickies << quickie1
        context1.quickies << quickie2
        expect(context1.quickies_count).to eq 2
        expect(context2.quickies_count).to eq 0
        context2.quickies << quickie1
        context2.quickies << quickie2
        expect(context1.quickies_count).to eq 2
        expect(context2.quickies_count).to eq 2
      end
    end

    context 'when a quickie is updated within a transaction' do
      it 'still increments and decrements properly' do
        context2 = create(:context)
        quickie = create(:quickie, context_ids: [context.id, context2.id])
        expect(context.reload.quickies_count).to eq 1
        quickie.update_attributes!(done: true)
        expect(context.reload.quickies_count).to eq 0
        Quickie.transaction do
          quickie.update_attributes!(done: false)
        end
        expect(context.reload.quickies_count).to eq 1
        expect(context2.reload.quickies_count).to eq 1
      end
    end
  end

end
