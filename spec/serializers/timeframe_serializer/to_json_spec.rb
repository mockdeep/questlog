RSpec.describe TimeframeSerializer, '#to_json' do

  let(:task) { create(:task) }
  let(:timeframe) { Timeframe.new(name: 'Inbox', tasks: [task]) }
  let(:serialized_task) { TaskSerializer.new(task).as_json(root: false) }
  let(:timeframe_serializer) { TimeframeSerializer.new(timeframe) }

  it 'returns the timeframe with its tasks serialized' do
    expected = {
      'name' => 'Inbox',
      'tasks' => [serialized_task.stringify_keys],
    }
    expect(JSON.parse(timeframe_serializer.to_json(root: false))).to eq expected
  end

end
