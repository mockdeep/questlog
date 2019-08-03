RSpec.describe Timeframe, '.for' do

  let(:user) { create(:user) }

  it 'returns a collection of timeframes for the given user' do
    expect(described_class.for(user: user)).to eq [
      described_class.new(name: 'inbox', tasks: []),
      described_class.new(name: 'today', tasks: []),
      described_class.new(name: 'week', tasks: []),
      described_class.new(name: 'month', tasks: []),
      described_class.new(name: 'quarter', tasks: []),
      described_class.new(name: 'year', tasks: []),
      described_class.new(name: 'lustrum', tasks: []),
      described_class.new(name: 'decade', tasks: []),
      described_class.new(name: 'century', tasks: []),
    ]
    task = create(:task, user: user)
    timeframes = described_class.for(user: user)
    inbox_timeframe = timeframes.first
    expect(inbox_timeframe.name).to eq 'inbox'
    expect(inbox_timeframe.tasks).to eq [task]

    task.update(timeframe: 'year')
    timeframes = described_class.for(user: user)
    inbox_timeframe = timeframes.first
    expect(inbox_timeframe.name).to eq 'inbox'
    expect(inbox_timeframe.tasks).to eq []
    year_timeframe = timeframes.find { |timeframe| timeframe.name == 'year' }
    expect(year_timeframe.tasks).to eq [task]
  end

end
