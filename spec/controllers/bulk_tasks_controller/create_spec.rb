RSpec.describe BulkTasksController, '#create' do

  let(:params) { { titles: "*1d breath\n#home @10pm go to bed" } }
  let(:user) { create(:free_user) }

  before(:each) do
    login_as(user)
  end

  it 'creates multiple tasks' do
    expect do
      post(:create, bulk_task: params)
    end.to change(Task, :count).by(2)
    expect(Task.undone.first.title).to eq 'breath'
    expect(Task.done.first.title).to eq 'go to bed'
  end

  it 'redirects to tasks#index' do
    post(:create, bulk_task: params)
    expect(response).to redirect_to(tasks_path)
  end

end
