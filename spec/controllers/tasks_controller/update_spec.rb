RSpec.describe TasksController, '#update' do

  let(:user) { create(:user) }
  let(:task) { create(:task, user: user, estimate_seconds: 605) }
  let(:task_2) { create(:task, user: user, estimate_seconds: 302) }
  let(:task_params) { { title: 'foo #home !3 ~5m' } }

  before(:each) { login_as(user) }

  it 'updates the stat count for the current user when task is marked done' do
    expect do
      put(:update, id: task.id, task: { done: true }, format: :json)
    end.to change(user.stats, :count).by 1
    stat = user.stats.last
    expect(stat.value).to eq 605
    expect(stat.timestamp).to eq Time.zone.now.beginning_of_day
    expect do
      put(:update, id: task_2.id, task: { done: true }, format: :json)
    end.not_to change(user.stats, :count)
    expect(stat.reload.value).to eq 907
  end

  it 'does not update the stat counter when task is not marked done' do
    expect do
      put(:update, id: task.id, task: task_params, format: :json)
    end.not_to change(user.stats, :count)
  end

  it 'updates the task appropriately' do
    put(:update, id: task.id, task: task_params, format: :json)
    task.reload
    expect(task.title).to eq 'foo'
    expect(task.tag_names).to eq %w(home)
    expect(task.priority).to eq 3
    expect(task.estimate_seconds).to eq 300
  end

  it 'responds with the task as json' do
    put(:update, id: task.id, task: task_params, format: :json)
    task = JSON.parse(response.body)['task']
    expect(task['title']).to eq 'foo'
    expect(task['tag_names']).to eq %w(home)
    expect(task['priority']).to eq 3
    expect(task['estimate_seconds']).to eq 300
  end

end
