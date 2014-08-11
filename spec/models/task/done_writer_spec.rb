require 'spec_helper'

describe Task, '#done=' do

  let(:user) { create(:user) }
  let(:task) { build(:task, user: user) }
  let(:context) { create(:context, user: user) }

  context 'when given true' do
    it 'sets done_at to Time.now' do
      freeze_time do |time|
        task.done = true
        expect(task.done_at).to eq time
      end
    end

    context 'when it was previously nil' do
      it 'decrements unfinished_tasks_count for its associated contexts' do
        task.update_attributes(contexts: [context])
        expect(context.reload.unfinished_tasks_count).to eq 1
        task.update_attributes(done: true)
        expect(context.reload.unfinished_tasks_count).to eq 0
      end

      it 'decrements unfinished_tasks_count for its associated user' do
        task.save!
        expect do
          task.update_attributes(done: true)
        end.to change { user.reload.unfinished_tasks_count }.from(1).to(0)
      end

      it 'sets its skip_count to 0' do
        task.skip_count = 5
        expect do
          task.done = true
        end.to change(task, :skip_count).from(5).to(0)
      end

      it 'updates release_at when there is a repeat' do
        task.repeat_seconds = 5.minutes
        expect(task.release_at).to be_nil

        freeze_time do
          expect do
            task.done = true
          end.to change(task, :release_at).from(nil).to(5.minutes.from_now)
        end
      end

      context 'when hit multiple times with the same request' do
        it 'does not decrement multiple times' do
          configure_for_threading!

          task.save!

          threaded do
            Task.find(task.id).update_attributes!(done: true)
          end

          expect(user.reload.unfinished_tasks_count).to eq 0
        end
      end
    end

    context 'if it was not previously nil' do
      it 'does not change unfinished_tasks_count for its contexts' do
        task.update_attributes!(contexts: [context], done: true)
        expect(context.reload.unfinished_tasks_count).to eq 0
        expect do
          task.update_attributes(done: true)
        end.not_to change { context.reload.unfinished_tasks_count }
      end

      it 'does not change unfinished_tasks_count for its associated user' do
        task.update_attributes!(done: true)
        expect(user.reload.unfinished_tasks_count).to eq 0
        task.update_attributes!(done: true)
        expect(user.reload.unfinished_tasks_count).to eq 0
      end
    end
  end

  context 'when given false' do
    it 'sets done_at to nil' do
      task.done = true
      task.done = false
      expect(task.done_at).to eq nil
    end

    context 'if it was previously nil' do
      it 'does not change unfinished_tasks_count for its contexts' do
        task.update_attributes(contexts: [context])
        expect(context.reload.unfinished_tasks_count).to eq 1
        task.update_attributes(done: false)
        expect(context.reload.unfinished_tasks_count).to eq 1
      end

      it 'does not change unfinished_tasks_count for its associated user' do
        task.save!
        expect(user.reload.unfinished_tasks_count).to eq 1
        task.update_attributes(done: false)
        expect(user.reload.unfinished_tasks_count).to eq 1
      end
    end

    context 'if it was not previously nil' do
      it 'increments unfinished_tasks_count for its associated contexts' do
        task.update_attributes!(contexts: [context], done: true)
        expect do
          task.update_attributes(done: false)
        end.to change { context.reload.unfinished_tasks_count }.from(0).to(1)
      end

      it 'increments unfinished_tasks_count for its associated contexts' do
        task.update_attributes!(done: true)
        expect(user.reload.unfinished_tasks_count).to eq 0
        task.update_attributes!(done: false)
        expect(user.reload.unfinished_tasks_count).to eq 1
      end
    end
  end

  context 'when the task is invalid' do
    it 'does not update counters' do
      task.save!
      expect(user.reload.unfinished_tasks_count).to eq 1
      expect do
        # can't use #update_attributes because it's transactional
        # test would pass regardless
        task.attributes = { done: true, title: nil }
        task.save
      end.not_to change { user.reload.unfinished_tasks_count }
    end
  end

end
