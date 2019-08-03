RSpec.describe Stat, '#median' do

  it 'returns the median of the filtered stats' do
    stat_1 = create(:stat, value: 3)
    stat_2 = create(:stat, value: 1)
    create(:stat, value: 52)

    expect(described_class.where(id: [stat_1.id, stat_2.id]).median).to be 2
  end

  it 'returns nil when no values are given' do
    expect(described_class.none.median).to be nil
  end

end
