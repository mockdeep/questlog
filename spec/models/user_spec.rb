require 'spec_helper'

describe User do

  let(:context) { create(:context, user: user) }
  let(:task1) { create(:task, user: user) }
  let(:task2) { create(:task, user: user) }
  let(:user) { create(:user) }

  describe 'associations' do
    it { should have_many(:tasks).dependent(:destroy) }
    it { should have_many(:contexts).dependent(:destroy) }

    it { should belong_to(:account).dependent(:destroy) }
  end

  describe 'validations' do
    it { should ensure_inclusion_of(:mode).in_array(%w(simple advanced)) }
  end

  describe '#next_task' do
    context 'given a context_id parameter' do
      it 'returns the next task for that context' do
        task1
        task2.contexts << context
        expect(user.next_task).to eq task1
        expect(user.next_task(context.id)).to eq task2
      end
    end

    it 'returns the next undone task' do
      task1
      task2
      expect(user.next_task).to eq task1
      task1.update_attributes(done: true)
      expect(user.next_task).to eq task2
      task2.update_attributes(done: true)
      expect(user.reload.next_task).to be_nil
    end
  end

  describe '#tasks_count' do
    it 'tracks how many unfinished tasks there are for the user' do
      expect(user.tasks_count).to eq 0
      user.tasks.create!(title: 'wah!')
      expect(user.reload.tasks_count).to eq 1
      task = user.tasks.new(title: 'blah')
      task.save!
      expect(user.reload.tasks_count).to eq 2
      create(:task, user: user)
      expect(user.reload.tasks_count).to eq 3
    end

    context 'when a user is added to the task' do
      it 'is incremented' do
        create(:task, user: user)
        expect(user.reload.tasks_count).to eq 1
      end
    end

    context 'when a task is marked complete' do
      it 'is decremented' do
        task = create(:task, user: user)
        expect(user.reload.tasks_count).to eq 1
        task.update_attributes(done: true)
        expect(user.reload.tasks_count).to eq 0
      end
    end

    context 'when a task is destroyed' do
      it 'is decremented' do
        task = create(:task, user: user)
        task.destroy
        expect(user.reload.tasks_count).to eq 0
      end
    end

    context 'when a task is marked complete and then incomplete' do
      it 'is decremented and then incremented' do
        task = create(:task, user: user)
        expect(user.reload.tasks_count).to eq 1
        task.update_attributes(done: true)
        expect(user.reload.tasks_count).to eq 0
        task.update_attributes(done: false)
        expect(user.reload.tasks_count).to eq 1
      end
    end

    context 'when a task is updated within a transaction' do
      it 'still increments and decrements properly' do
        task = create(:task, user: user)
        expect(user.reload.tasks_count).to eq 1
        task.update_attributes!(done: true)
        expect(user.reload.tasks_count).to eq 0
        Task.transaction do
          task.update_attributes!(done: false)
        end
        expect(user.reload.tasks_count).to eq 1
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
    it 'takes the tasks from the other user' do
      other_user = create(:user)
      other_task = create(:task, user: other_user)
      user.absorb(other_user)
      expect(other_task.reload.user).to eq user
    end

    it 'updates the tasks counter' do
      task1
      other_user = create(:user)
      create(:task, user: other_user)
      user.absorb(other_user)
      expect(user.reload.tasks_count).to eq 2
    end

    it 'deletes the other user' do
      other_user = create(:user)
      user.absorb(other_user)
      expect(User.find_by_id(other_user.id)).to be_nil
    end

    it 'merges contexts' do
      other_user = create(:user)
      create(:context, name: 'solo', user: other_user)
      other_context2 = create(:context, name: 'duplicate', user: other_user)
      other_task = create(
        :task,
        title: 'bloo',
        user: other_user,
        contexts: [other_context2],
      )
      create(:context, name: 'another-solo', user: user)
      context2 = create(:context, name: 'duplicate', user: user)
      expected_names = %w(another-solo duplicate solo)
      user.absorb(other_user)
      expect(user.reload.contexts.pluck(:name).sort).to eq expected_names
      expect(other_task.reload.contexts).to eq [context2]
    end
  end

end
