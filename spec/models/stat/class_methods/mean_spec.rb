RSpec.describe Stat, '#mean' do

  it 'returns the mean of the filtered stats' do
    stat_1 = create(:stat, value: 3)
    stat_2 = create(:stat, value: 1)
    create(:stat, value: 52)

    expect(Stat.where(id: [stat_1.id, stat_2.id]).mean).to be 2
  end

  it 'returns nil when no values are given' do
    expect(Stat.none.mean).to be nil
  end

end
