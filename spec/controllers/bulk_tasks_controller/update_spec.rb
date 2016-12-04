RSpec.describe BulkTasksController, '#update' do

  let(:user) { create(:user) }
  let(:task_1) { create(:task, position: 1, user: user) }
  let(:task_2) { create(:task, position: 2, user: user) }
  let(:task_3) { create(:task, position: 3, user: user) }
  let(:task_4) { create(:task, position: 4, user: user) }
  let(:task_5) { create(:task, position: 5, user: user) }

  before(:each) { login_as(user) }

  let(:positions) { [task_4, task_2, task_1, task_3, task_5].map(&:id) }
  let(:valid_params) { { bulk_task: { positions: positions } } }

  it 'allows setting positions on tasks' do
    put(:update, params: valid_params)

    expect(task_1.reload.position).to eq 3
    expect(task_2.reload.position).to eq 2
    expect(task_3.reload.position).to eq 4
    expect(task_4.reload.position).to eq 1
    expect(task_5.reload.position).to eq 5
  end

  it 'redirects to tasks/index' do
    put(:update, params: valid_params)
    expect(response).to redirect_to tasks_path
  end

  it 'throws an error if given an invalid task id' do
    bad_task = create(:task)
    expect do
      put(:update, params: { bulk_task: { positions: [bad_task.id] } })
    end.to raise_error(ActiveRecord::RecordNotFound)
  end

end
