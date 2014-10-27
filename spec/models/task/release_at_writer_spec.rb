require 'spec_helper'

describe Task, '#release_at=' do

  let(:user) { create(:user) }
  let(:task) { build(:task, user: user) }
  let(:tag) { create(:tag, user: user) }

  it 'does not change "done" when it has already been changed' do
    task.update_attributes!(done: true)
    task.done = false
    expect { task.release_at = 2.days.from_now }.not_to change(task, :done?)
  end

  context 'when the task is not done' do
    it 'sets the task to done when set to a value' do
      expect do
        task.release_at = 2.days.from_now
      end.to change(task, :done?).from(false).to(true)
      expect(task.done?).to be true
    end

    it 'does not change to done when set to nil' do
      expect { task.release_at = nil }.not_to change(task, :done?)
    end

    it 'sets counters appropriately' do
      task.tags = [tag]
      expect do
        task.save!
      end.to change { tag.reload.unfinished_tasks_count }.by(1)
      task.release_at = 2.days.from_now
      expect do
        task.save!
      end.to change { tag.reload.unfinished_tasks_count }.by(-1)
    end
  end

  context 'when the task is already done' do
    it 'is still done when set to a value' do
      task.done = true
      expect { task.release_at = 2.days.from_now }.not_to change(task, :done?)
      expect { task.release_at = nil }.not_to change(task, :done?)
    end

    it 'sets counters appropriately' do
      task.attributes = { tags: [tag], done: true }
      expect do
        task.save!
      end.not_to change { tag.reload.unfinished_tasks_count }
      task.release_at = 2.days.from_now
      expect do
        task.save!
      end.not_to change { tag.reload.unfinished_tasks_count }
    end
  end

end
