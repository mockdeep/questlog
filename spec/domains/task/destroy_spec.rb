RSpec.describe Task::Destroy do

  let(:task) { create(:task) }
  let(:user) { task.user }
  let(:tag) { create(:tag) }
  let(:action) { described_class.new }

  it 'destroys the task' do
    action.(task)
    expect(Task.find_by(id: task.id)).to be nil
  end

  it 'updates associated task counters' do
    task.tags = [tag]

    expect do
      action.(task)
    end.to change { tag.reload.unfinished_tasks_count }.from(1).to(0)
      .and change { user.reload.unfinished_tasks_count }.from(1).to(0)
  end

  it 'allows deletion of pending tasks' do
    task.update!(done: true, release_at: 1.hour.from_now)
    expect { action.(task) }.not_to raise_error
    expect(user.reload.unfinished_tasks_count).to eq 0
  end

end
