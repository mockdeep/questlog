require 'spec_helper'

describe TasksController, '#destroy' do

  let(:task) { create(:task) }
  let(:user) { task.user }
  let(:context) { create(:context, user: user) }

  before(:each) do
    login_as(user)
    request.env['HTTP_REFERER'] = '/whatevs'
  end

  it 'destroys the task for the given user' do
    task.contexts = [context]
    expect(context.tasks).to eq([task])
    expect(context.reload.unfinished_tasks_count).to eq(1)
    delete(:destroy, id: task.id)

    expect(context.reload.tasks).to eq([])
    expect(context.unfinished_tasks_count).to eq 0
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

end
