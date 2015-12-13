RSpec.describe Task, '.next' do

  let(:user) { create(:user) }

  it 'returns the next task, sorted by priority first, then position' do
    task1 = create(:task, user: user)
    task2 = create(:task, user: user)
    task3 = create(:task, priority: 1, user: user)
    task4 = create(:task, priority: 2, user: user)
    expect(Task.next).to eq task3
    task3.update(done: true)
    expect(Task.next).to eq task4
    task4.update(done: true)
    expect(Task.next).to eq task1
    task1.update(done: true)
    expect(Task.next).to eq task2
    task2.update(done: true)
    expect(Task.next).to be_nil
  end

  it 'returns the next task for the closest timeframe' do
    task1 = create(:task, user: user, timeframe: 'today')
    task2 = create(:task, user: user, timeframe: 'week')
    task3 = create(:task, priority: 1, user: user, timeframe: 'today')
    task4 = create(:task, priority: 2, user: user)
    expect(Task.next).to eq task3
    task3.update(done: true)
    expect(Task.next).to eq task1
    task1.update(done: true)
    expect(Task.next).to eq task2
    task2.update(done: true)
    expect(Task.next).to eq task4
    task4.update(done: true)
    expect(Task.next).to be_nil
  end

end
