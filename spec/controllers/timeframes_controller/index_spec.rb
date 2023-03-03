RSpec.describe TimeframesController, '#index' do
  let(:user) { create(:user) }
  let(:stat_params) { { name: 'seconds-completed', user: } }

  before(:each) { login_as(user) }

  it 'returns the median productivity for the current user' do
    Stat.create!(stat_params.merge(value: 35.minutes, timestamp: 1.month.ago))
    Stat.create!(stat_params.merge(value: 1.hour, timestamp: 1.week.ago))
    get(:index, format: :json)
    meta = response.parsed_body['meta']
    expect(meta).to include('medianProductivity' => 1.hour)
    Stat.create!(stat_params.merge(value: 35.minutes, timestamp: 5.days.ago))
    get(:index, format: :json)
    meta = response.parsed_body['meta']
    expect(meta).to include('medianProductivity' => 2850)
  end

  it 'returns the inbox timeframe for the current user' do
    task = create(:task, user:)
    serial_task = hash_including('id' => task.id, 'timeframe' => nil)
    get(:index, format: :json)
    timeframes = response.parsed_body['data']
    expect(timeframes).to include('name' => 'inbox', 'tasks' => [serial_task])
  end

  it 'returns various other timeframes' do
    task_1 = create(:task, user:)
    task_2 = create(:task, user:, timeframe: 'week')
    task_3 = create(:task, user:, timeframe: 'year')

    serial_task_1 = hash_including('id' => task_1.id, 'timeframe' => nil)
    serial_task_2 = hash_including('id' => task_2.id, 'timeframe' => 'week')
    serial_task_3 = hash_including('id' => task_3.id, 'timeframe' => 'year')

    get(:index, format: :json)

    timeframes = response.parsed_body['data']
    expect(timeframes).to include('name' => 'inbox', 'tasks' => [serial_task_1])
    expect(timeframes).to include('name' => 'week', 'tasks' => [serial_task_2])
    expect(timeframes).to include('name' => 'month', 'tasks' => [])
    expect(timeframes).to include('name' => 'quarter', 'tasks' => [])
    expect(timeframes).to include('name' => 'year', 'tasks' => [serial_task_3])
    expect(timeframes).to include('name' => 'lustrum', 'tasks' => [])
  end
end
