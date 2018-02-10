RSpec.describe Stat::StandardDeviation do

  it 'returns the standard deviation of the numbers given' do
    expect(described_class.([1, 2])).to eq 0.7071067811865476
    expect(described_class.([1, 3])).to eq 1.4142135623730951
    expect(described_class.([1, 3, 5])).to eq 2
    expect(described_class.([1, 3, 52])).to eq 28.884828774519907
    expect(described_class.([1, 3, 5, 52])).to eq 24.55436145915154
  end

  it 'returns the standard deviation of unordered numbers' do
    expect(described_class.([2, 1])).to eq 0.7071067811865476
    expect(described_class.([3, 1])).to eq 1.4142135623730951
    expect(described_class.([3, 1, 5])).to eq 2
    expect(described_class.([3, 52, 1])).to eq 28.884828774519907
    expect(described_class.([1, 5, 52, 3])).to eq 24.55436145915154
  end

  it 'returns 0 when given only a single number' do
    expect(described_class.([1])).to be 0
    expect(described_class.([125])).to be 0
  end

  it 'returns nil when no numbers are given' do
    expect(described_class.([])).to be nil
  end

end
