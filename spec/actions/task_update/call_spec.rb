RSpec.describe TaskUpdate, '#call' do

  let(:mock_task) { instance_spy(Task, estimate_seconds: 301) }
  let(:mock_stat_class) { class_spy(Stat) }
  let(:task_update) { TaskUpdate.new(mock_task, stat_class: mock_stat_class) }
  let(:task_params) do
    { title: 'foo', tag_names: ['home'], priority: 3, estimate_seconds: 300 }
  end

  it 'sets the attributes on the task' do
    task_update.(task_params)
    expect(mock_task).to have_received(:attributes=).with(task_params)
  end

  it 'saves the task' do
    task_update.(task_params)
    expect(mock_task).to have_received(:save!)
  end

  it 'updates the stat count for the user when the task is marked completed' do
    allow(mock_task).to receive(:changed_to_done?).and_return(true)
    task_update.(task_params)
  end

end
