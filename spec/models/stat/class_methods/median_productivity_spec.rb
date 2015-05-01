RSpec.describe Stat, '.median_productivity' do

  let(:user) { create(:user) }
  let(:mock_median) { class_spy(Median) }
  let(:options) { { default: 1.hour } }

  def create_stat(params)
    StatCreate.new(stat_class: Stat).(params)
  end

  it 'returns 1 hour when there are no stats in past 2 weeks' do
    create_stat(user: user, value: 35.minutes, timestamp: 1.month.ago)
    allow(mock_median).to receive(:new).and_return(52)

    result = Stat.median_productivity(median_class: mock_median)

    expect(mock_median).to have_received(:new).with([], options)
    expect(result).to eq(52)
  end

  it 'returns 1 hour when the only stat is today' do
    create_stat(user: user, value: 35.minutes, timestamp: Time.zone.now)
    allow(mock_median).to receive(:new).and_return(63)

    result = Stat.median_productivity(median_class: mock_median)

    expect(mock_median).to have_received(:new).with([], options)
    expect(result).to eq(63)
  end

  it 'returns the median of the stats for past 2 weeks, excluding today' do
    create_stat(user: user, value: 35.minutes, timestamp: 1.month.ago)
    create_stat(user: user, value: 35.minutes, timestamp: Time.zone.now)
    create_stat(user: user, value: 35.minutes, timestamp: 1.day.ago)

    allow(mock_median).to receive(:new).and_return(74)
    result = Stat.median_productivity(median_class: mock_median)
    expected_array = match_array([35.minutes])
    expect(mock_median).to have_received(:new).with(expected_array, options)
    expect(result).to eq(74)

    allow(mock_median).to receive(:new).and_return(85)
    create_stat(user: user, value: 1.hour, timestamp: 2.days.ago)
    result = Stat.median_productivity(median_class: mock_median)
    expected_array = match_array([35.minutes, 1.hour])
    expect(mock_median).to have_received(:new).with(expected_array, options)
    expect(result).to eq(85)

    allow(mock_median).to receive(:new).and_return(96)
    create_stat(user: user, value: 45.minutes, timestamp: 3.days.ago)
    result = Stat.median_productivity(median_class: mock_median)
    expected_array = match_array([35.minutes, 1.hour, 45.minutes])
    expect(mock_median).to have_received(:new).with(expected_array, options)
    expect(result).to eq(96)

    allow(mock_median).to receive(:new).and_return(2)
    create_stat(user: user, value: 25.minutes, timestamp: 4.days.ago)
    result = Stat.median_productivity(median_class: mock_median)
    expected_array = match_array([35.minutes, 1.hour, 45.minutes, 25.minutes])
    expect(mock_median).to have_received(:new).with(expected_array, options)
    expect(result).to eq(2)
  end

end
