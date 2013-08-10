require 'spec_helper'

describe User do

  let(:context) { create(:context, user: user) }
  let(:quickie1) { create(:quickie, user: user) }
  let(:quickie2) { create(:quickie, user: user) }
  let(:user) { create(:user) }

  describe 'associations' do
    it { should have_many(:quickies).dependent(:destroy) }
    it { should have_many(:contexts).dependent(:destroy) }

    it { should belong_to(:account).dependent(:destroy) }
  end

  describe '#valid?' do
    it { should ensure_inclusion_of(:mode).in_array(['simple', 'advanced']) }
  end

  describe '#next_quickie' do
    context 'given a context_id parameter' do
      it 'returns the next quickie for that context' do
        quickie1
        quickie2.contexts << context
        expect(user.next_quickie).to eq quickie1
        expect(user.next_quickie(context.id)).to eq quickie2
      end
    end

    it 'returns the next undone quickie' do
      quickie1
      quickie2
      expect(user.next_quickie).to eq quickie1
      quickie1.update_attributes(skip: true)
      expect(user.next_quickie).to eq quickie2
      quickie2.update_attributes(done: true)
      expect(user.reload.next_quickie).to eq quickie1
    end
  end

  describe '#quickies_count' do
    it 'tracks how many unfinished quickies there are for the user' do
      expect(user.quickies_count).to eq 0
      user.quickies.create!(title: 'wah!')
      expect(user.reload.quickies_count).to eq 1
    end
  end

  describe '#other_mode' do
    context 'when the user\'s mode is "advanced"' do
      it 'returns "simple"' do
        user.mode = 'advanced'
        expect(user.other_mode).to eq 'simple'
      end
    end

    context 'when the user\'s mode is "simple"' do
      it 'returns "advanced"' do
        user.mode = 'simple'
        expect(user.other_mode).to eq 'advanced'
      end
    end
  end

end
