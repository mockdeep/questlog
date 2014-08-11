require 'spec_helper'

describe Task, '#tag_names' do

  let(:user) { create(:user) }
  let(:task) { build(:task, user: user) }
  let(:context) { create(:context, user: user) }
  let(:context2) { create(:context, user: user) }

  context 'after save' do
    it 'sets the contexts for the task' do
      task.update_attributes!(tag_names: [context.name])
      expect(task.contexts).to eq [context]
    end

    it 'increments the counter for the associated context' do
      expect do
        task.update_attributes!(tag_names: [context.name])
      end.to change { context.reload.unfinished_tasks_count }.from(0).to(1)
    end

    it 'decrements the counter for contexts removed' do
      task.update_attributes!(tag_names: [context.name])
      expect do
        task.update_attributes!(tag_names: [context2.name])
      end.to change { context.reload.unfinished_tasks_count }.from(1).to(0)
    end
  end

  context 'when the task is invalid' do
    it 'does not increment associated counters' do
      expect(context.reload.unfinished_tasks_count).to eq 0
      task.update_attributes(title: '', tag_names: [context.name])
      expect(context.reload.unfinished_tasks_count).to eq 0
    end
  end

end
