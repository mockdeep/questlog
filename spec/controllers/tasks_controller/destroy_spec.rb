RSpec.describe TasksController, '#destroy' do

  let(:task) { create(:task) }
  let(:user) { task.user }
  let(:tag) { create(:tag, user: user) }

  before(:each) do
    login_as(user)
    request.env['HTTP_REFERER'] = '/whatevs'
  end

  it 'destroys the task for the given user' do
    task.tags = [tag]
    expect(tag.tasks).to eq([task])
    expect(tag.reload.unfinished_tasks_count).to eq(1)
    delete(:destroy, id: task.id)

    expect(tag.reload.tasks).to eq([])
    expect(tag.unfinished_tasks_count).to eq 0
    expect(user.reload.unfinished_tasks_count).to eq 0
  end

  context 'when clicked multiple times' do
    it 'does not decrement the counter multiple times' do
      configure_for_threading!

      task = create(:task)
      user = task.user
      login_as(user)

      threaded do
        @controller = TasksController.new
        delete(:destroy, id: task.id)
      end

      expect(user.reload.unfinished_tasks_count).to eq 0
    end
  end

  it 'allows deletion of pending tasks' do
    task.update!(done: true, release_at: 1.hour.from_now)
    expect { delete(:destroy, id: task.id) }.not_to raise_error
  end

end
