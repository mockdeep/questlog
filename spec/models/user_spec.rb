require 'spec_helper'

describe User do

  let(:context) { create(:context, user: user) }
  let(:task1) { create(:task, user: user) }
  let(:task2) { create(:task, user: user) }
  let(:user) { create(:user) }

  describe '#tasks_count' do
    it 'tracks how many unfinished tasks there are for the user' do
      expect(user.unfinished_tasks_count).to eq 0
      user.tasks.create!(title: 'wah!')
      expect(user.reload.unfinished_tasks_count).to eq 1
      task = user.tasks.new(title: 'blah')
      task.save!
      expect(user.reload.unfinished_tasks_count).to eq 2
      create(:task, user: user)
      expect(user.reload.unfinished_tasks_count).to eq 3
    end

    context 'when a user is added to the task' do
      it 'is incremented' do
        create(:task, user: user)
        expect(user.reload.unfinished_tasks_count).to eq 1
      end
    end

    context 'when a task is marked complete' do
      it 'is decremented' do
        task = create(:task, user: user)
        expect(user.reload.unfinished_tasks_count).to eq 1
        task.update_attributes(done: true)
        expect(user.reload.unfinished_tasks_count).to eq 0
      end
    end

    context 'when a task is destroyed' do
      it 'is decremented' do
        task = create(:task, user: user)
        task.destroy
        expect(user.reload.unfinished_tasks_count).to eq 0
      end
    end

    context 'when a task is marked complete and then incomplete' do
      it 'is decremented and then incremented' do
        task = create(:task, user: user)
        expect(user.reload.unfinished_tasks_count).to eq 1
        task.update_attributes(done: true)
        expect(user.reload.unfinished_tasks_count).to eq 0
        task.update_attributes(done: false)
        expect(user.reload.unfinished_tasks_count).to eq 1
      end
    end

    context 'when a task is updated within a transaction' do
      it 'still increments and decrements properly' do
        task = create(:task, user: user)
        expect(user.reload.unfinished_tasks_count).to eq 1
        task.update_attributes!(done: true)
        expect(user.reload.unfinished_tasks_count).to eq 0
        Task.transaction do
          task.update_attributes!(done: false)
        end
        expect(user.reload.unfinished_tasks_count).to eq 1
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
      task1.update_attributes(done: true)
      other_user = create(:user)
      create(:task, user: other_user)
      expect do
        user.absorb(other_user)
      end.to change { user.reload.unfinished_tasks_count }.from(0).to(1)
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
