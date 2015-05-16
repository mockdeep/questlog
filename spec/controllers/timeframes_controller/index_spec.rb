RSpec.describe TimeframesController, '#index' do

  let(:user) { create(:user) }

  before(:each) { login_as(user) }

  it 'returns the median productivity for the current user' do
    Stat.create!(user: user, value: 35.minutes, timestamp: 1.month.ago)
    Stat.create!(user: user, value: 1.hour, timestamp: 1.week.ago)
    get(:index)
    meta = JSON.parse(response.body)['meta']
    expect(meta).to include('medianProductivity' => 1.hour)
    Stat.create!(user: user, value: 35.minutes, timestamp: 5.days.ago)
    get(:index)
    meta = JSON.parse(response.body)['meta']
    expect(meta).to include('medianProductivity' => 2850)
  end

  it 'returns the Inbox timeframe for the current user' do
    task = create(:task, user: user)
    serial_task = TaskSerializer.new(task).as_json(root: false).stringify_keys
    get(:index)
    timeframes = JSON.parse(response.body)['timeframes']
    expect(timeframes).to include('name' => 'Inbox', 'tasks' => [serial_task])
  end

end
