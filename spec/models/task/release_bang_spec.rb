RSpec.describe Task, '#release!' do

  let(:user) { create(:user) }
  let(:task) do
    create(
      :task,
      position: 5,
      release_at: 1.day.ago,
      done_at: 1.month.ago,
      user: user,
    )
  end

  it 'marks the task as not done' do
    expect { task.release! }.to change(task, :done_at).to(nil)
  end

  it 'sets the position to the max position' do
    create(:task, user: user)
    create(:task, user: user, position: 15)
    create(:task, user: user, position: 3)
    create(:task, done_at: 1.month.ago, user: user, position: 18)
    create(:task, position: 17)
    expect { task.release! }.to change(task, :position).to(16)
  end

  it 'increments the counters' do
    expect do
      task.release!
    end.to change { user.reload.unfinished_tasks_count }.by(1)
  end

  it 'sets release_at to nil' do
    expect { task.release! }.to change(task, :release_at).to(nil)
  end

end
