RSpec.describe Timeframe, '.for' do

  let(:user) { create(:user) }
  it 'returns a collection of timeframes for the given user' do
    expect(Timeframe.for(user: user)).to eq []
    task = create(:task, user: user)
    timeframes = Timeframe.for(user: user)
    expect(timeframes.length).to eq 1
    inbox_timeframe = timeframes.first
    expect(inbox_timeframe.name).to eq 'Inbox'
    expect(inbox_timeframe.tasks).to eq [task]
  end

end
