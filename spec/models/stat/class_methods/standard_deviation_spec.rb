RSpec.describe Stat, '#standard_deviation' do

  it 'returns the standard deviation of the filtered stats' do
    stat_1 = create(:stat, value: 3)
    stat_2 = create(:stat, value: 1)
    create(:stat, value: 52)

    stats = described_class.where(id: [stat_1.id, stat_2.id])
    expect(stats.standard_deviation).to eq 1.4142135623730951
  end

  it 'returns nil when no values are given' do
    expect(described_class.none.standard_deviation).to be nil
  end

  it 'returns 0 when only a single value is given' do
    stat = create(:stat, value: 3)

    expect(described_class.where(id: stat.id).standard_deviation).to be 0
  end

end
