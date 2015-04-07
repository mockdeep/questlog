RSpec.describe Task, '.ordered' do

  it 'returns tasks with priority first, position second' do
    task_1 = create(:task)
    task_2 = create(:task, priority: 3)
    task_3 = create(:task, priority: 1)
    task_4 = create(:task, priority: 2)
    task_5 = create(:task)

    expect(Task.ordered).to eq [task_3, task_4, task_2, task_1, task_5]
  end

end
