RSpec.describe Task, '.next' do

  let(:user) { create(:user) }

  it 'returns the next task, sorted by priority first, then position' do
    task_1 = create(:task, user: user)
    task_2 = create(:task, user: user)
    task_3 = create(:task, priority: 1, user: user)
    task_4 = create(:task, priority: 2, user: user)
    expect(Task.next).to eq task_3
    task_3.update(done: true)
    expect(Task.next).to eq task_4
    task_4.update(done: true)
    expect(Task.next).to eq task_1
    task_1.update(done: true)
    expect(Task.next).to eq task_2
    task_2.update(done: true)
    expect(Task.next).to be_nil
  end

  it 'returns the next task for the closest timeframe' do
    task_1 = create(:task, user: user, timeframe: 'today')
    task_2 = create(:task, user: user, timeframe: 'week')
    task_3 = create(:task, priority: 1, user: user, timeframe: 'today')
    task_4 = create(:task, priority: 2, user: user)
    expect(Task.next).to eq task_3
    task_3.update(done: true)
    expect(Task.next).to eq task_1
    task_1.update(done: true)
    expect(Task.next).to eq task_2
    task_2.update(done: true)
    expect(Task.next).to eq task_4
    task_4.update(done: true)
    expect(Task.next).to be_nil
  end

end
