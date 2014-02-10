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

  describe 'validations' do
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
      quickie = user.quickies.new(title: 'blah')
      quickie.save!
      expect(user.reload.quickies_count).to eq 2
      create(:quickie, user: user)
      expect(user.reload.quickies_count).to eq 3
    end

    context 'when a user is added to the quickie' do
      it 'is incremented' do
        quickie = create(:quickie, user: user)
        expect(user.reload.quickies_count).to eq 1
      end
    end

    context 'when a quickie is marked complete' do
      it 'is decremented' do
        quickie = create(:quickie, user: user)
        expect(user.reload.quickies_count).to eq 1
        quickie.update_attributes(done: true)
        expect(user.reload.quickies_count).to eq 0
      end
    end

    context 'when a quickie is destroyed' do
      it 'is decremented' do
        quickie = create(:quickie, user: user)
        quickie.destroy
        expect(user.reload.quickies_count).to eq 0
      end
    end

    context 'when a quickie is marked complete and then incomplete' do
      it 'is decremented and then incremented' do
        quickie = create(:quickie, user: user)
        expect(user.reload.quickies_count).to eq 1
        quickie.update_attributes(done: true)
        expect(user.reload.quickies_count).to eq 0
        quickie.update_attributes(done: false)
        expect(user.reload.quickies_count).to eq 1
      end
    end

    context 'when a quickie is updated within a transaction' do
      it 'still increments and decrements properly' do
        quickie = create(:quickie, user: user)
        expect(user.reload.quickies_count).to eq 1
        quickie.update_attributes!(done: true)
        expect(user.reload.quickies_count).to eq 0
        Quickie.transaction do
          quickie.update_attributes!(done: false)
        end
        expect(user.reload.quickies_count).to eq 1
      end
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

  describe '#absorb' do
    it 'takes the quickies from the other user' do
      other_user = create(:user)
      other_quickie = create(:quickie, user: other_user)
      user.absorb(other_user)
      expect(other_quickie.reload.user).to eq user
    end

    it 'updates the quickies counter' do
      quickie1
      other_user = create(:user)
      other_quickie = create(:quickie, user: other_user)
      user.absorb(other_user)
      expect(user.reload.quickies_count).to eq 2
    end

    it 'deletes the other user' do
      other_user = create(:user)
      user.absorb(other_user)
      expect(User.find_by_id(other_user.id)).to be_nil
    end

    it 'merges contexts' do
      other_user = create(:user)
      other_context1 = create(:context, name: 'solo', user: other_user)
      other_context2 = create(:context, name: 'duplicate', user: other_user)
      other_quickie = create(:quickie, title: 'bloo', user: other_user, contexts: [other_context2])
      context1 = create(:context, name: 'another-solo', user: user)
      context2 = create(:context, name: 'duplicate', user: user)
      expected_names = ['another-solo', 'duplicate', 'solo']
      user.absorb(other_user)
      expect(user.reload.contexts.pluck(:name).sort).to eq expected_names
      expect(other_quickie.reload.contexts).to eq [context2]
    end
  end

end
