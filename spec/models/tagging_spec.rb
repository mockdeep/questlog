require 'spec_helper'

describe Tagging do

  let(:task) { create(:task) }
  let(:context) { create(:context) }

  describe 'associations' do
    it { should belong_to(:task) }
    it { should belong_to(:context) }
  end

  describe 'validations' do
    it { should validate_presence_of(:task) }
    it { should validate_presence_of(:context) }
    it { should validate_uniqueness_of(:task_id).scoped_to(:context_id) }
  end

  describe 'after create' do
    context 'when the task is not done' do
      it 'increments the associated context unfinished_tasks_count' do
        expect do
          create(:tagging, context: context, task: task)
        end.to change { context.reload.unfinished_tasks_count }.from(0).to(1)
      end
    end
  end

  describe 'after destroy' do
    it 'decrements the associated context unfinished_tasks_count' do
      tagging = create(:tagging, context: context, task: task)
      expect do
        tagging.destroy
      end.to change { context.reload.unfinished_tasks_count }.from(1).to(0)
    end
  end

end
