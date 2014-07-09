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

  describe '#done=' do
    context 'when given true' do
      it 'sets done_at to Time.now' do
        time = Time.zone.now
        Time.zone.stub(:now).and_return(time)
        task.done = true
        expect(task.done_at).to eq time
      end

      context 'if it was previously nil' do
        it 'decrements tasks_count for its associated contexts' do
          task.update_attributes(contexts: [context])
          expect(context.reload.tasks_count).to eq 1
          task.update_attributes(done: true)
          expect(context.reload.tasks_count).to eq 0
        end

        it 'decrements tasks_count for its associated user' do
          task.save!
          expect(user.reload.tasks_count).to eq 1
          task.update_attributes(done: true)
          expect(user.reload.tasks_count).to eq 0
        end

        it 'sets its skip_count to 0' do
          task.skip_count = 5
          task.done = true
          expect(task.skip_count).to eq(0)
        end
      end

      context 'if it was not previously nil' do
        it 'does not change tasks_count for its associated contexts' do
          task.update_attributes!(contexts: [context], done: true)
          expect(context.reload.tasks_count).to eq 0
          expect do
            task.update_attributes(done: true)
          end.not_to change { context.reload.tasks_count }
        end

        it 'does not change tasks_count for its associated user' do
          task.update_attributes!(done: true)
          expect(user.reload.tasks_count).to eq 0
          task.update_attributes!(done: true)
          expect(user.reload.tasks_count).to eq 0
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
        it 'does not change tasks_count for its associated contexts' do
          task.update_attributes(contexts: [context])
          expect(context.reload.tasks_count).to eq 1
          task.update_attributes(done: false)
          expect(context.reload.tasks_count).to eq 1
        end

        it 'does not change tasks_count for its associated user' do
          task.save!
          expect(user.reload.tasks_count).to eq 1
          task.update_attributes(done: false)
          expect(user.reload.tasks_count).to eq 1
        end
      end

      context 'if it was not previously nil' do
        it 'increments tasks_count for its associated contexts' do
          task.update_attributes!(contexts: [context], done: true)
          expect do
            task.update_attributes(done: false)
          end.to change { context.reload.tasks_count }.from(0).to(1)
        end

        it 'increments tasks_count for its associated contexts' do
          task.update_attributes!(done: true)
          expect(user.reload.tasks_count).to eq 0
          task.update_attributes!(done: false)
          expect(user.reload.tasks_count).to eq 1
        end
      end
    end

    context 'when the task is invalid' do
      it 'does not update counters' do
        task.save!
        expect(user.reload.tasks_count).to eq 1
        expect do
          # can't use #update_attributes because it's transactional
          # test would pass regardless
          task.attributes = { done: true, title: nil }
          task.save
        end.not_to change { user.reload.tasks_count }
      end
    end
  end

  describe '#skip=' do
    context 'when passed false' do
      it 'does nothing' do
        expect { task.skip = false }.not_to change(task, :updated_at)
        expect { task.skip = false }.not_to change(task, :skip_count)
      end
    end

    context 'when passed true' do
      it 'updates the updated_at' do
        expect { task.skip = true }.to change(task, :updated_at)
      end

      it 'increments the skip_count' do
        expect do
          task.skip = true
        end.to change(task, :skip_count).from(0).to(1)
      end
    end
  end

  describe '#context_ids=' do
    let(:context2) { create(:context, user: user) }

    it 'sets the contexts for the task' do
      task.context_ids = [context.id]
      expect(task.contexts).to eq [context]
    end

    it 'increments the counter for the associated context' do
      expect do
        task.update_attributes!(context_ids: [context.id])
      end.to change { context.reload.tasks_count }.from(0).to(1)
    end

    it 'decrements the counter for contexts removed' do
      task.update_attributes!(context_ids: [context.id])
      expect do
        task.update_attributes!(context_ids: [context2.id])
      end.to change { context.reload.tasks_count }.from(1).to(0)
    end

    context 'if the task is invalid' do
      it 'does not increment associated counters' do
        expect(context.reload.tasks_count).to eq 0
        task.update_attributes(title: '', context_ids: [context.id])
        expect(context.reload.tasks_count).to eq 0
      end
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
        end.to change { context.reload.tasks_count }.from(0).to(1)
      end

      it 'decrements the counter for contexts removed' do
        task.update_attributes!(tag_names: [context.name])
        expect do
          task.update_attributes!(tag_names: [context2.name])
        end.to change { context.reload.tasks_count }.from(1).to(0)
      end
    end

    context 'when the task is invalid' do
      it 'does not increment associated counters' do
        expect(context.reload.tasks_count).to eq 0
        task.update_attributes(title: '', tag_names: [context.name])
        expect(context.reload.tasks_count).to eq 0
      end
    end
  end

  describe '#repeat' do
    context 'when there is a repeat string' do
      it 'returns a repeat instance' do
        task.repeat_string = 'every day'
        repeat = task.repeat
        expect(repeat).to be_instance_of(Repeat)
        expect(repeat.time_delta).to eq 1.day
      end
    end

    context 'when there is not a repeat string' do
      it 'returns nil' do
        expect(task.repeat).to be_nil
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

  describe '#over_skipped?' do
    context 'when the skip count is >= 5' do
      it 'returns true' do
        task.skip_count = 5
        expect(task).to be_over_skipped
      end
    end

    context 'when the skip count is < 5' do
      it 'returns false' do
        task.skip_count = 4
        expect(task).not_to be_over_skipped
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
    context 'when the task is not done' do
      it 'sets the task to done' do

      end

      it 'sets counters appropriately' do

      end
    end
  end

end
