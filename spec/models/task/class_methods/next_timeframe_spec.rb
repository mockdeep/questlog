RSpec.describe Task, '.next_timeframe' do

  let(:user) { create(:user) }

  it 'returns the next timeframe that has a task' do
    task1 = create(:task, user: user, timeframe: 'today')
    task2 = create(:task, user: user, timeframe: 'week')
    task3 = create(:task, priority: 1, user: user, timeframe: 'today')
    create(:task, priority: 2, user: user)
    expect(Task.next_timeframe).to eq 'today'
    task3.update(done: true)
    expect(Task.next_timeframe).to eq 'today'
    task1.update(done: true)
    expect(Task.next_timeframe).to eq 'week'
    task2.update(done: true)
    expect(Task.next_timeframe).to be_nil
  end

end
