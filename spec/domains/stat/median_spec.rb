RSpec.describe Stat::Median do

  it 'returns the median of the numbers given' do
    expect(described_class.([1])).to be 1
    expect(described_class.([1, 2])).to be 1
    expect(described_class.([1, 3])).to be 2
    expect(described_class.([1, 3, 5])).to be 3
    expect(described_class.([1, 3, 52])).to be 3
    expect(described_class.([1, 3, 5, 52])).to be 4
  end

  it 'returns the median of unordered numbers' do
    expect(described_class.([1])).to be 1
    expect(described_class.([2, 1])).to be 1
    expect(described_class.([3, 1])).to be 2
    expect(described_class.([3, 1, 5])).to be 3
    expect(described_class.([3, 52, 1])).to be 3
    expect(described_class.([1, 5, 52, 3])).to be 4
  end

  it 'returns nil when no numbers are given' do
    expect(described_class.([])).to be nil
  end

end
