require 'spec_helper'

describe Task do

  let(:user) { create(:user) }
  let(:task) { build(:task, user: user) }
  let(:context) { create(:context, user: user) }

  describe 'associations' do
    it { should belong_to(:user) }
    it { should have_many(:taggings).dependent(:destroy) }
    it { should have_many(:contexts).through(:taggings) }
  end

  describe 'validations' do
    it { should validate_presence_of(:title) }
    it { should validate_presence_of(:user) }
    it { should validate_numericality_of(:time_estimate) }
    it { should validate_numericality_of(:priority) }
  end

  describe '.between' do
    it 'returns tasks with done_at between the given times' do
      create(:task, done_at: 3.days.ago)
      task2 = create(:task, done_at: 1.days.ago)
      create(:task, done_at: Time.now)
      create(:task)
      expect(Task.between(2.days.ago, 10.minutes.ago)).to eq [task2]
    end
  end

  describe '.next' do
    context 'when there are priorities' do
      it 'returns priority tasks first' do
        task1 = create(:task)
        task2 = create(:task)
        task3 = create(:task, priority: 1)
        task4 = create(:task, priority: 2)
        expect(Task.next).to eq task3
        task3.update_attributes(done: true)
        expect(Task.next).to eq task4
        task4.update_attributes(done: true)
        expect(Task.next).to eq task1
        task1.update_attributes(done: true)
        expect(Task.next).to eq task2
        task2.update_attributes(done: true)
        expect(Task.next).to be_nil
      end
    end
  end

  describe '#contexts=' do
    it 'updates counters on the contexts' do
      task.save!
      expect do
        task.contexts = [context]
      end.to change { context.reload.unfinished_tasks_count }.by(1)
    end
  end

  describe '#done=' do
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

  describe '#postpone=' do
    it 'sets the done_at' do
      freeze_time do
        task.postpone = 5.minutes
        expect(task.done_at).to eq Time.zone.now
      end
    end

    it 'sets the release_at' do
      freeze_time do
        task.postpone = 5.minutes
        expect(task.release_at).to eq 5.minutes.from_now
      end
    end

    it 'increments the skip_count' do
      expect do
        task.postpone = 5.minutes
      end.to change(task, :skip_count).from(0).to(1)
    end
  end

  describe '#tag_names=' do
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

  describe '#done?' do
    context 'when done_at' do
      it 'returns true' do
        task.done_at = Time.now
        expect(task).to be_done
      end
    end

    context 'when not done_at' do
      it 'returns false' do
        expect(task).not_to be_done
      end
    end
  end

  describe '#repeat_string=' do
    context 'when the string is blank' do
      it 'sets it to nil' do
        task.repeat_string = ''
        expect(task.repeat_string).to be_nil
      end
    end

    context 'when the repeat string is not empty' do
      it 'sets it to the given string' do
        task.repeat_string = 'foo'
        expect(task.repeat_string).to eq 'foo'
      end
    end
  end

  describe '#release_at=' do
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
        task.contexts = [context]
        expect do
          task.save!
        end.to change { context.reload.unfinished_tasks_count }.by(1)
        task.release_at = 2.days.from_now
        expect do
          task.save!
        end.to change { context.reload.unfinished_tasks_count }.by(-1)
      end
    end

    context 'when the task is already done' do
      it 'is still done when set to a value' do
        task.done = true
        expect { task.release_at = 2.days.from_now }.not_to change(task, :done?)
        expect { task.release_at = nil }.not_to change(task, :done?)
      end

      it 'sets counters appropriately' do
        task.attributes = { contexts: [context], done: true }
        expect do
          task.save!
        end.not_to change { context.reload.unfinished_tasks_count }
        task.release_at = 2.days.from_now
        expect do
          task.save!
        end.not_to change { context.reload.unfinished_tasks_count }
      end
    end
  end

  describe '#repeat?' do
    it 'returns true when repeat_seconds is present' do
      task.repeat_seconds = 1234
      expect(task.repeat?).to be true
    end

    it 'returns false when repeat_seconds is not present' do
      expect(task.repeat?).to be false
    end
  end

end
