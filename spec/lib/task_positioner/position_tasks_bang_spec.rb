RSpec.describe TaskPositioner, '#position_tasks!' do

  let(:positioner) { TaskPositioner.new }
  let(:user) { create(:user) }

  it 'positions unfinished tasks based on their updated_at' do
    task_1 = create(:task, user: user)
    task_2 = create(:task, user: user, position: 5)
    task_3 = create(:task, user: user, position: 1)
    task_4 = create(:task, user: user, priority: 2)
    task_5 = create(:task)
    user_tasks = [task_4, task_2, task_3, task_1]

    task_1.touch

    positioner.position_tasks!
    expect(user.tasks.order(:position).pluck(:id)).to eq user_tasks.map(&:id)
    expect(task_1.reload.position).to eq 4
    expect(task_2.reload.position).to eq 2
    expect(task_3.reload.position).to eq 3
    expect(task_4.reload.position).to eq 1

    expect(task_5.reload.position).to eq 1
  end

  it 'sets the position to finished tasks to 0' do
    task_1 = create(:task, user: user)
    task_2 = create(:task, user: user, done_at: 1.week.ago)
    task_2.update_attributes!(position: nil)
    task_3 = create(:task, done_at: 1.month.ago)
    task_3.update_attributes!(position: nil)

    positioner.position_tasks!

    expect(task_1.reload.position).to eq 1
    expect(task_2.reload.position).to eq 0
    expect(task_3.reload.position).to eq 0
  end

end
