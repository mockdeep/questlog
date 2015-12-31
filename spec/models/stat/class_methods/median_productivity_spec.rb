RSpec.describe Stat, '.median_productivity' do

  let(:user) { create(:user) }
  let(:mock_median) { class_spy(Median) }
  let(:options) { { default: 1.hour } }
  let(:stat_params) { { name: 'seconds-completed', user: user } }

  it 'returns 1 hour when there are no stats in past 2 weeks' do
    Stat.create!(stat_params.merge(value: 35.minutes, timestamp: 1.month.ago))
    result = Stat.median_productivity
    expect(result).to eq(1.hour)
  end

  it 'returns 1 hour when the only stat is today' do
    Stat.create!(stat_params.merge(value: 35.minutes, timestamp: Time.zone.now))
    result = Stat.median_productivity
    expect(result).to eq(1.hour)
  end

  it 'returns the median of the stats for past 2 weeks, excluding today' do
    Stat.create!(stat_params.merge(value: 35.minutes, timestamp: 1.month.ago))
    Stat.create!(stat_params.merge(value: 40.minutes, timestamp: Time.zone.now))
    Stat.create!(stat_params.merge(value: 15.minutes, timestamp: 1.day.ago))

    result = Stat.median_productivity
    expect(result).to eq(15.minutes)

    Stat.create!(stat_params.merge(value: 1.hour, timestamp: 2.days.ago))
    result = Stat.median_productivity
    expect(result).to eq((15.minutes + 1.hour) / 2)

    Stat.create!(stat_params.merge(value: 45.minutes, timestamp: 3.days.ago))
    result = Stat.median_productivity
    expect(result).to eq(45.minutes)

    Stat.create!(stat_params.merge(value: 25.minutes, timestamp: 4.days.ago))
    result = Stat.median_productivity
    expect(result).to eq((25.minutes + 45.minutes) / 2)
  end

end
