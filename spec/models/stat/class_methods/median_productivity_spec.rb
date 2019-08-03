RSpec.describe Stat, '.median_productivity' do

  let(:user) { create(:user) }
  let(:mock_median) { class_spy(Median) }
  let(:options) { { default: 1.hour } }
  let(:stat_params) { { name: 'seconds-completed', user: user } }

  def create_stat(value:, timestamp:)
    described_class.create!(**stat_params, value: value, timestamp: timestamp)
  end

  it 'returns 1 hour when there are no stats in past 2 weeks' do
    create_stat(value: 35.minutes, timestamp: 1.month.ago)

    result = described_class.median_productivity

    expect(result).to eq(1.hour)
  end

  it 'returns 1 hour when the only stat is today' do
    create_stat(value: 35.minutes, timestamp: Time.zone.now)

    result = described_class.median_productivity

    expect(result).to eq(1.hour)
  end

  it 'returns the median of the stats for past 2 weeks, excluding today' do
    create_stat(value: 35.minutes, timestamp: 1.month.ago)
    create_stat(value: 40.minutes, timestamp: Time.zone.now)
    create_stat(value: 15.minutes, timestamp: 1.day.ago)

    result = described_class.median_productivity

    expect(result).to eq(15.minutes)

    create_stat(value: 1.hour, timestamp: 2.days.ago)

    result = described_class.median_productivity

    expect(result).to eq((15.minutes + 1.hour) / 2)

    create_stat(value: 45.minutes, timestamp: 3.days.ago)

    result = described_class.median_productivity

    expect(result).to eq(45.minutes)

    create_stat(value: 25.minutes, timestamp: 4.days.ago)

    result = described_class.median_productivity

    expect(result).to eq((25.minutes + 45.minutes) / 2)
  end

end
