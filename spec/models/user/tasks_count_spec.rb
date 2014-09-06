require 'spec_helper'

describe User, '#tasks_count' do

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

end
