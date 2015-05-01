RSpec.describe TimeframesController, '#index' do

  let(:user) { create(:user) }

  before(:each) { login_as(user) }

  def create_stat(params)
    StatCreate.new(stat_class: Stat).(params)
  end

  it 'returns the median productivity for the current user' do
    create_stat(user: user, value: 35.minutes, timestamp: 1.month.ago)
    create_stat(user: user, value: 1.hour, timestamp: 1.week.ago)
    get(:index)
    expect(JSON.parse(response.body)).to eq('medianProductivity' => 1.hour.to_i)
    create_stat(user: user, value: 35.minutes, timestamp: 5.days.ago)
    get(:index)
    expect(JSON.parse(response.body)).to eq('medianProductivity' => 2850)
  end

end
