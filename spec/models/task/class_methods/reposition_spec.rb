RSpec.describe Task, '.reposition' do

  it 'sets the sort position for tasks' do
    task_1 = create(:task, position: 1)
    task_2 = create(:task, position: 2)
    task_3 = create(:task, position: 3)
    task_4 = create(:task, position: 4)
    task_5 = create(:task, position: 5)

    Task.reposition([task_4, task_2, task_1, task_3, task_5].map(&:id))

    expect(task_1.reload.position).to eq 3
    expect(task_2.reload.position).to eq 2
    expect(task_3.reload.position).to eq 4
    expect(task_4.reload.position).to eq 1
    expect(task_5.reload.position).to eq 5
  end

end
