require 'spec_helper'

describe Task, '#tag_names' do

  let(:user) { create(:user) }
  let(:task) { build(:task, user: user) }
  let(:tag) { create(:tag, user: user) }
  let(:tag2) { create(:tag, user: user) }

  context 'after save' do
    it 'sets the tags for the task' do
      task.update_attributes!(tag_names: [tag.name])
      expect(task.tags).to eq [tag]
    end

    it 'increments the counter for the associated tag' do
      expect do
        task.update_attributes!(tag_names: [tag.name])
      end.to change { tag.reload.unfinished_tasks_count }.from(0).to(1)
    end

    it 'decrements the counter for tags removed' do
      task.update_attributes!(tag_names: [tag.name])
      expect do
        task.update_attributes!(tag_names: [tag2.name])
      end.to change { tag.reload.unfinished_tasks_count }.from(1).to(0)
    end
  end

  context 'when the task is invalid' do
    it 'does not increment associated counters' do
      expect(tag.reload.unfinished_tasks_count).to eq 0
      task.update_attributes(title: '', tag_names: [tag.name])
      expect(tag.reload.unfinished_tasks_count).to eq 0
    end
  end

end
