require 'spec_helper'

describe Quickie do

  let(:quickie) { build(:quickie) }
  let(:context) { create(:context) }
  let(:user) { quickie.user }

  describe 'associations' do
    it { should belong_to(:user) }
    it { should have_many(:taggings).dependent(:destroy) }
    it { should have_many(:contexts).through(:taggings) }
  end

  describe '#valid?' do
    it { should validate_presence_of(:title) }
    it { should validate_presence_of(:user) }
  end

  describe '#done=' do
    context 'when given true' do
      it 'sets done_at to Time.now' do
        time = Time.zone.now
        Time.zone.stub(:now).and_return(time)
        quickie.done = true
        expect(quickie.done_at).to eq time
      end

      context 'if it was previously nil' do
        it 'decrements quickies_count for its associated contexts' do
          quickie.update_attributes(context_ids: [context.id])
          expect(context.reload.quickies_count).to eq 1
          quickie.update_attributes(done: true)
          expect(context.reload.quickies_count).to eq 0
        end

        it 'decrements quickies_count for its associated user' do
          quickie.save!
          expect(user.reload.quickies_count).to eq 1
          quickie.update_attributes(done: true)
          expect(user.reload.quickies_count).to eq 0
        end
      end

      context 'if it was not previously nil' do
        it 'does not change quickies_count for its associated contexts' do
          quickie.update_attributes(context_ids: [context.id], done: true)
          expect(context.reload.quickies_count).to eq 0
          quickie.update_attributes(done: true)
          expect(context.reload.quickies_count).to eq 0
        end

        it 'does not change quickies_count for its associated user' do
          quickie.update_attributes!(done: true)
          expect(user.reload.quickies_count).to eq 0
          quickie.update_attributes!(done: true)
          expect(user.reload.quickies_count).to eq 0
        end
      end
    end

    context 'when given false' do
      it 'sets done_at to nil' do
        quickie.done = true
        quickie.done = false
        expect(quickie.done_at).to eq nil
      end

      context 'if it was previously nil' do
        it 'does not change quickies_count for its associated contexts' do
          quickie.update_attributes(context_ids: [context.id])
          expect(context.reload.quickies_count).to eq 1
          quickie.update_attributes(done: false)
          expect(context.reload.quickies_count).to eq 1
        end

        it 'does not change quickies_count for its associated user' do
          quickie.save!
          expect(user.reload.quickies_count).to eq 1
          quickie.update_attributes(done: false)
          expect(user.reload.quickies_count).to eq 1
        end
      end

      context 'if it was not previously nil' do
        it 'increments quickies_count for its associated contexts' do
          quickie.update_attributes(context_ids: [context.id], done: true)
          expect(context.reload.quickies_count).to eq 0
          quickie.update_attributes(done: false)
          expect(context.reload.quickies_count).to eq 1
        end

        it 'increments quickies_count for its associated contexts' do
          quickie.update_attributes!(done: true)
          expect(user.reload.quickies_count).to eq 0
          quickie.update_attributes!(done: false)
          expect(user.reload.quickies_count).to eq 1
        end
      end
    end
  end

  describe '#context_ids=' do
    it 'sets the contexts for the quickie' do
      quickie.context_ids = [context.id]
      expect(quickie.contexts).to eq [context]
    end

    it 'increments the counter for the associated context' do
      expect(context.reload.quickies_count).to eq 0
      quickie.context_ids = [context.id]
      expect(context.reload.quickies_count).to eq 1
    end

    context 'if the quickie is invalid' do
      it 'does not increment associated counters' do
        expect(context.reload.quickies_count).to eq 0
        quickie.update_attributes(title: '', context_ids: [context.id])
        expect(context.reload.quickies_count).to eq 0
      end
    end
  end

end
