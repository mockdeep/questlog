RSpec.describe Tag, '#next_task' do

  let(:user) { create(:user) }
  let(:tag) { create(:tag, user: user) }

  it 'returns the next task' do
    task_1 = create(:task, user: user)
    task_2 = create(:task, user: user)
    tag.tasks << task_1
    tag.tasks << task_2
    expect(tag.next_task).to eq task_1
    task_1.update!(done: true)
    expect(tag.next_task).to eq task_2
  end

end
