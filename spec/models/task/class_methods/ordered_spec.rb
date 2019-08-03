RSpec.describe Task, '.ordered' do

  let(:user) { create(:user) }

  it 'returns tasks with priority first, position second' do
    task_1 = create(:task, user: user)
    task_2 = create(:task, user: user, priority: 3)
    task_3 = create(:task, user: user, priority: 1)
    task_4 = create(:task, user: user, priority: 2)
    task_5 = create(:task, user: user)
    ordered_tasks = [task_3, task_4, task_2, task_1, task_5]

    expect(described_class.ordered).to eq ordered_tasks
  end

end
