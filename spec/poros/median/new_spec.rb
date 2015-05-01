RSpec.describe Median, '#new' do

  it 'returns the median of the numbers given' do
    expect(Median.new([1], default: 5)).to eq 1
    expect(Median.new([1, 2], default: 5)).to eq 1
    expect(Median.new([1, 3], default: 5)).to eq 2
    expect(Median.new([1, 3, 5], default: 5)).to eq 3
    expect(Median.new([1, 3, 52], default: 5)).to eq 3
    expect(Median.new([1, 3, 5, 52], default: 5)).to eq 4
  end

  it 'returns the default value if no numbers are given' do
    expect(Median.new([], default: 5)).to eq 5
    expect(Median.new([], default: 2)).to eq 2
  end

end
