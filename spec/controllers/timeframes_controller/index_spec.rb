RSpec.describe TimeframesController, '#index' do

  let(:user) { create(:user) }

  before(:each) { login_as(user) }

  def serialize(task)
    TaskSerializer.new(task).as_json(root: false).stringify_keys
  end

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

  it 'returns the inbox timeframe for the current user' do
    task = create(:task, user: user)
    serial_task = serialize(task)
    get(:index)
    timeframes = JSON.parse(response.body)['timeframes']
    expect(timeframes).to include('name' => 'inbox', 'tasks' => [serial_task])
  end

  it 'returns various other timeframes' do
    task_1 = create(:task, user: user)
    task_2 = create(:task, user: user, timeframe: 'week')
    task_3 = create(:task, user: user, timeframe: 'year')

    serial_task_1 = serialize(task_1)
    serial_task_2 = serialize(task_2)
    serial_task_3 = serialize(task_3)

    get(:index)

    timeframes = JSON.parse(response.body)['timeframes']
    expect(timeframes).to include('name' => 'inbox', 'tasks' => [serial_task_1])
    expect(timeframes).to include('name' => 'week', 'tasks' => [serial_task_2])
    expect(timeframes).to include('name' => 'month', 'tasks' => [])
    expect(timeframes).to include('name' => 'quarter', 'tasks' => [])
    expect(timeframes).to include('name' => 'year', 'tasks' => [serial_task_3])
    expect(timeframes).to include('name' => 'lustrum', 'tasks' => [])
  end

end
