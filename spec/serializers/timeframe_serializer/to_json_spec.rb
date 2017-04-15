RSpec.describe TimeframeSerializer, '#to_json' do

  let(:task) { create(:task) }
  let(:timeframe) { Timeframe.new(name: 'Inbox', tasks: [task]) }
  let(:timeframe_serializer) { TimeframeSerializer.new }

  it 'returns the timeframe with its tasks serialized' do
    expected = {
      name: 'Inbox',
      tasks: [hash_including(id: task.id)],
    }

    serialized = timeframe_serializer.(timeframe)
    expect(serialized).to match expected
  end

end
