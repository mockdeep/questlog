require 'spec_helper'

describe TasksController, '#destroy' do

  let(:task) { create(:task) }
  let(:user) { task.user }
  let(:context) { create(:context, user: user) }

  before(:each) do
    login_as(user)
  end

  it 'destroys the task for the given user' do
    request.env['HTTP_REFERER'] = '/whatevs'
    task.contexts = [context]
    expect(context.tasks).to eq([task])
    expect(context.reload.unfinished_tasks_count).to eq(1)
    delete(:destroy, id: task.id)

    expect(context.reload.tasks).to eq([])
    expect(context.unfinished_tasks_count).to eq(0)
  end
end
