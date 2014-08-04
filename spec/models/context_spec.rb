require 'spec_helper'

describe Context do
  let(:user) { create(:user) }
  let(:context) { create(:context, user: user) }

  describe 'associations' do
    it { should belong_to(:user) }

    it { should have_many(:taggings) }
    it { should have_many(:tasks).through(:taggings) }
  end

  describe 'validations' do
    it { should validate_presence_of(:name) }
    it { should validate_presence_of(:user) }

    it { should validate_uniqueness_of(:name).scoped_to(:user_id) }
  end

  describe '.ordered' do
    it 'returns contexts ordered by name' do
      context1 = create(:context, name: 'bill')
      context2 = create(:context, name: 'alice')
      context3 = create(:context, name: 'charlie')
      expect(Context.ordered).to eq [context2, context1, context3]
    end
  end

  describe '#tasks_count' do
    context 'when a task is added to the context' do
      it 'is incremented' do
        expect(context.unfinished_tasks_count).to eq 0
        task = create(:task)
        context.tasks << task
        expect(context.reload.unfinished_tasks_count).to eq 1
      end
    end

    context 'when a context is added to the task' do
      it 'is incremented' do
        create(:task, contexts: [context], user: user)
        expect(context.reload.unfinished_tasks_count).to eq 1
      end
    end

    context 'when a task is marked complete' do
      it 'is decremented' do
        task = create(:task, contexts: [context], user: user)
        expect(context.reload.unfinished_tasks_count).to eq 1
        task.update_attributes(done: true)
        expect(context.reload.unfinished_tasks_count).to eq 0
      end
    end

    context 'when a task is destroyed' do
      it 'is decremented' do
        task = create(:task, contexts: [context], user: user)
        task.destroy
        expect(context.reload.unfinished_tasks_count).to eq 0
      end
    end

    context 'when a task is marked complete and then incomplete' do
      it 'is decremented and then incremented' do
        task = create(:task, contexts: [context], user: user)
        expect(context.reload.unfinished_tasks_count).to eq 1
        task.update_attributes(done: true)
        expect(context.reload.unfinished_tasks_count).to eq 0
        task.update_attributes(done: false)
        expect(context.reload.unfinished_tasks_count).to eq 1
      end
    end

    context 'when there are more than one task and more than one context' do
      it 'increments and decrements properly' do
        task1 = create(:task, user: user)
        task2 = create(:task, user: user)
        context1 = create(:context, user: user)
        context2 = create(:context, user: user)
        expect(context1.unfinished_tasks_count).to eq 0
        expect(context2.unfinished_tasks_count).to eq 0
        context1.tasks << task1
        context1.tasks << task2
        expect(context1.reload.unfinished_tasks_count).to eq 2
        expect(context2.reload.unfinished_tasks_count).to eq 0
        context2.tasks << task1
        context2.tasks << task2
        expect(context1.reload.unfinished_tasks_count).to eq 2
        expect(context2.reload.unfinished_tasks_count).to eq 2
      end
    end

    context 'when a task is updated within a transaction' do
      it 'still increments and decrements properly' do
        context2 = create(:context, user: user)
        task = create(:task, contexts: [context, context2], user: user)
        expect(context.reload.unfinished_tasks_count).to eq 1
        task.update_attributes!(done: true)
        expect(context.reload.unfinished_tasks_count).to eq 0
        Task.transaction do
          task.update_attributes!(done: false)
        end
        expect(context.reload.unfinished_tasks_count).to eq 1
        expect(context2.reload.unfinished_tasks_count).to eq 1
      end
    end
  end

  describe '#any?' do
    context 'when there are tasks' do
      it 'returns true' do
        context.tasks << create(:task)
        expect(context.reload.any?).to be_true
      end
    end

    context 'context when there are no tasks' do
      it 'returns false' do
        expect(context.any?).to be_false
      end
    end
  end

  describe '#next_task' do
    it 'returns the next task' do
      task1 = create(:task)
      task2 = create(:task)
      context.tasks << task1
      context.tasks << task2
      expect(context.next_task).to eq task1
      task1.update_attributes!(done: true)
      expect(context.next_task).to eq task2
    end
  end

end
