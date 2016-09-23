RSpec.describe Tag, '#tasks_count' do

  let(:user) { create(:user) }
  let(:tag) { create(:tag, user: user) }

  context 'when a task is added to the tag' do
    it 'is incremented' do
      expect(tag.unfinished_tasks_count).to eq 0
      task = create(:task)
      tag.tasks << task
      expect(tag.reload.unfinished_tasks_count).to eq 1
    end
  end

  context 'when a tag is added to the task' do
    it 'is incremented' do
      create(:task, tags: [tag], user: user)
      expect(tag.reload.unfinished_tasks_count).to eq 1
    end
  end

  context 'when a task is marked complete' do
    it 'is decremented' do
      task = create(:task, tags: [tag], user: user)
      expect(tag.reload.unfinished_tasks_count).to eq 1
      task.update(done: true)
      expect(tag.reload.unfinished_tasks_count).to eq 0
    end
  end

  context 'when a task is destroyed' do
    it 'is decremented' do
      task = create(:task, tags: [tag], user: user)
      task.destroy
      expect(tag.reload.unfinished_tasks_count).to eq 0
    end
  end

  context 'when a task is marked complete and then incomplete' do
    it 'is decremented and then incremented' do
      task = create(:task, tags: [tag], user: user)
      expect(tag.reload.unfinished_tasks_count).to eq 1
      task.update(done: true)
      expect(tag.reload.unfinished_tasks_count).to eq 0
      task.update(done: false)
      expect(tag.reload.unfinished_tasks_count).to eq 1
    end
  end

  context 'when there are more than one task and more than one tag' do
    it 'increments and decrements properly' do
      task_1 = create(:task, user: user)
      task_2 = create(:task, user: user)
      tag_1 = create(:tag, user: user)
      tag_2 = create(:tag, user: user)
      expect(tag_1.unfinished_tasks_count).to eq 0
      expect(tag_2.unfinished_tasks_count).to eq 0
      tag_1.tasks << task_1
      tag_1.tasks << task_2
      expect(tag_1.reload.unfinished_tasks_count).to eq 2
      expect(tag_2.reload.unfinished_tasks_count).to eq 0
      tag_2.tasks << task_1
      tag_2.tasks << task_2
      expect(tag_1.reload.unfinished_tasks_count).to eq 2
      expect(tag_2.reload.unfinished_tasks_count).to eq 2
    end
  end

  context 'when a task is updated within a transaction' do
    it 'still increments and decrements properly' do
      tag_2 = create(:tag, user: user)
      task = create(:task, tags: [tag, tag_2], user: user)
      expect(tag.reload.unfinished_tasks_count).to eq 1
      task.update!(done: true)
      expect(tag.reload.unfinished_tasks_count).to eq 0
      Task.transaction do
        task.update!(done: false)
      end
      expect(tag.reload.unfinished_tasks_count).to eq 1
      expect(tag_2.reload.unfinished_tasks_count).to eq 1
    end
  end

end
