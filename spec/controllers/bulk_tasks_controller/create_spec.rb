RSpec.describe BulkTasksController, "#create" do
  let(:valid_attributes) { { titles: "*1d breath\n#home @10pm go to bed" } }
  let(:user) { create(:free_user) }
  let(:valid_params) { { bulk_task: valid_attributes } }

  before(:each) do
    login_as(user)
  end

  it "creates multiple tasks" do
    expect do
      post(:create, params: valid_params)
    end.to change(Task, :count).by(2)
    expect(Task.undone.first.title).to eq "breath"
    expect(Task.done.first.title).to eq "go to bed"
  end

  it "redirects to tasks#index" do
    post(:create, params: valid_params)

    expect(response).to redirect_to("/tasks")
  end
end
