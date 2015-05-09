RSpec.describe TaskUpdate, '#call' do

  let(:user) { create(:user) }
  let(:task) { create(:task, estimate_seconds: 301, user: user) }
  let(:mock_stat_create) { instance_spy(StatCreate) }
  let(:task_update) { TaskUpdate.new(task) }
  let(:task_params) do
    {
      title: 'foo',
      tag_names: %w(home),
      priority: 3,
      estimate_seconds: 300,
    }
  end
  let(:task_update_params) { task_params.merge(stat_create: mock_stat_create) }

  it 'updates the task' do
    task_update.(task_update_params)
    task.reload
    expect(task.title).to eq 'foo'
    expect(task.tag_names).to eq %w(home)
    expect(task.priority).to eq 3
    expect(task.estimate_seconds).to eq 300
  end

  it 'does not update the stat count when the task is not marked complete' do
    task_update.(task_update_params)
    expect(mock_stat_create).not_to have_received(:call)
  end

  it 'does not update the stat count when the task is postponed' do
    task_update.(task_update_params.merge(postpone: 300))
    expect(mock_stat_create).not_to have_received(:call)
  end

  context 'when the task has been marked complete' do
    it 'adds the tasks estimate to the stats for the current day' do
      allow(task).to receive(:changed_to_done?).and_return(true)
      task_update.(task_update_params)
      expected_args = { user: user, value: 300 }
      expect(mock_stat_create).to have_received(:call).with(expected_args)
    end
  end

end
