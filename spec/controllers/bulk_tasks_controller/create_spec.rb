RSpec.describe BulkTasksController, '#create' do

  let(:valid_attributes) { { titles: "*1d breath\n#home @10pm go to bed" } }
  let(:user) { create(:free_user) }
  let(:valid_params) { { format: :json, bulk_task: valid_attributes } }

  before(:each) do
    login_as(user)
  end

  it 'creates multiple tasks' do
    expect do
      post(:create, params: valid_params)
    end.to change(Task, :count).by(2)
    expect(Task.undone.first.title).to eq 'breath'
    expect(Task.done.first.title).to eq 'go to bed'
  end

  it 'renders a json response' do
    post(:create, params: valid_params)
    expect(response.status).to eq 200
    expect(JSON.parse(response.body)).to eq({})
  end

end
