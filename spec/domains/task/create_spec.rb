RSpec.describe Task::Create do

  let(:user) { create(:user) }
  let(:action) { described_class.new }

  it 'creates a task with the given params' do
    expect do
      action.(user: user, title: 'a title', priority: 3)
    end.to change(Task, :count).by(1)

    task = Task.last

    expect(task.title).to eq 'a title'
    expect(task.priority).to eq 3
  end

  context 'when given a parent_task_id' do
    it 'associates the created task with the parent task' do
      task_1 = create(:task, user: user)

      expect do
        action.(user: user, title: 'a title', parent_task_id: task_1.id)
      end.to change(Task, :count).by(1)

      task_2 = Task.last
      expect(task_2.title).to eq 'a title'
      expect(task_2.parent_task).to eq task_1
    end

    it 'raises an error when parent_task is not associated with user' do
      task_1 = create(:task)

      expect do
        action.(user: user, title: 'a title', parent_task_id: task_1.id)
      end.to raise_error(ActiveRecord::RecordNotFound)
    end
  end

end
