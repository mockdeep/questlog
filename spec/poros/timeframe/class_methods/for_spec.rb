RSpec.describe Timeframe, '.for' do

  let(:user) { create(:user) }
  it 'returns a collection of timeframes for the given user' do
    expect(Timeframe.for(user: user)).to eq [
      Timeframe.new(name: 'inbox', tasks: []),
      Timeframe.new(name: 'today', tasks: []),
      Timeframe.new(name: 'week', tasks: []),
      Timeframe.new(name: 'month', tasks: []),
      Timeframe.new(name: 'quarter', tasks: []),
      Timeframe.new(name: 'year', tasks: []),
      Timeframe.new(name: 'lustrum', tasks: []),
      Timeframe.new(name: 'decade', tasks: []),
      Timeframe.new(name: 'century', tasks: []),
    ]
    task = create(:task, user: user)
    timeframes = Timeframe.for(user: user)
    inbox_timeframe = timeframes.first
    expect(inbox_timeframe.name).to eq 'inbox'
    expect(inbox_timeframe.tasks).to eq [task]

    task.update(timeframe: 'year')
    timeframes = Timeframe.for(user: user)
    inbox_timeframe = timeframes.first
    expect(inbox_timeframe.name).to eq 'inbox'
    expect(inbox_timeframe.tasks).to eq []
    year_timeframe = timeframes.find { |timeframe| timeframe.name == 'year' }
    expect(year_timeframe.tasks).to eq [task]
  end

end
