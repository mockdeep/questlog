RSpec.describe TaskSerializer, '#as_json' do

  it 'serializes a subset of the task attributes' do
    task_attrs = {
      estimate_seconds: 52,
      position: 23,
      priority: 3,
      repeat_seconds: 25,
      release_at: 1.week.from_now,
      skip_count: 3,
      tag_names: %w[home work],
      title: 'foo task',
      timeframe: 'week',
    }

    task = create(:task, task_attrs)
    serializer = described_class.new

    expected_attrs = camelize_keys(task_attrs).merge(
      id: task.id,
      parentTaskId: nil,
      pending: true,
      tagIds: task.tag_ids,
    )

    expect(serializer.(task)).to eq(expected_attrs)
  end

  def camelize_keys(hash)
    hash.each_with_object({}) do |(key, value), result|
      result[key.to_s.camelize(:lower).to_sym] = value
    end
  end

end
