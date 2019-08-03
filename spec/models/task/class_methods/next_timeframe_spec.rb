RSpec.describe Task, '.next_timeframe' do

  let(:user) { create(:user) }

  it 'returns the next timeframe that has a task' do
    task_1 = create(:task, user: user, timeframe: 'today')
    task_2 = create(:task, user: user, timeframe: 'week')
    task_3 = create(:task, priority: 1, user: user, timeframe: 'today')
    create(:task, priority: 2, user: user)
    expect(described_class.next_timeframe).to eq 'today'
    task_3.update(done: true)
    expect(described_class.next_timeframe).to eq 'today'
    task_1.update(done: true)
    expect(described_class.next_timeframe).to eq 'week'
    task_2.update(done: true)
    expect(described_class.next_timeframe).to be_nil
  end

end
