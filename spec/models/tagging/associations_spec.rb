require 'spec_helper'

describe Tagging, 'associations' do

  let(:task) { create(:task) }
  let(:tag) { create(:tag) }

  it { is_expected.to belong_to(:task) }
  it { is_expected.to belong_to(:tag) }

  context 'after create' do
    context 'when the task is not done' do
      it 'increments the associated tag unfinished_tasks_count' do
        expect do
          create(:tagging, tag: tag, task: task)
        end.to change { tag.reload.unfinished_tasks_count }.from(0).to(1)
      end
    end
  end

  context 'after destroy' do
    it 'decrements the associated tag unfinished_tasks_count' do
      tagging = create(:tagging, tag: tag, task: task)
      expect do
        tagging.destroy
      end.to change { tag.reload.unfinished_tasks_count }.from(1).to(0)
    end
  end

end
