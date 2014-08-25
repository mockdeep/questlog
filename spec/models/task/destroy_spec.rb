require 'spec_helper'

describe Task, '#destroy' do

  let(:user) { create(:user) }
  let(:task) { create(:task, user: user) }
  let(:context) { create(:context, user: user) }

  context 'when task is pending' do
    it 'does not change context counters' do
      task.update_attributes!(contexts: [context])
      expect do
        task.update_attributes!(done: true, release_at: 1.hour.from_now)
      end.to change { context.reload.unfinished_tasks_count }.from(1).to(0)

      expect do
        task.destroy
      end.not_to change { context.reload.unfinished_tasks_count }
    end

    it 'does not change user counter' do
      task
      expect do
        task.update_attributes!(done: true, release_at: 1.hour.from_now)
      end.to change { user.reload.unfinished_tasks_count }.from(1).to(0)

      expect do
        task.destroy
      end.not_to change { user.reload.unfinished_tasks_count }
    end
  end

end
