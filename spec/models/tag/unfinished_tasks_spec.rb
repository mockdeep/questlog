RSpec.describe Tag, '#unfinished_tasks' do

  it 'returns unfinished tasks associated with the tag' do
    tag = create(:tag)
    task_1 = create(:task, title: 'open_task')
    task_2 = create(:task, done_at: 1.month.ago, title: 'finished_task')
    create(:task, title: 'another_open_task')
    tag.tasks << task_1 << task_2
    expect(tag.unfinished_tasks.map(&:title)).to eq ['open_task']
  end

end