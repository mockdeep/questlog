# frozen_string_literal: true

RSpec.describe BulkTasksController, "#update" do
  let(:user) { create(:user) }
  let(:task_1) { create(:task, position: 1, user:) }
  let(:task_2) { create(:task, position: 2, user:) }
  let(:task_3) { create(:task, position: 3, user:) }
  let(:task_4) { create(:task, position: 4, user:) }
  let(:task_5) { create(:task, position: 5, user:) }
  let(:positions) { [task_4, task_2, task_1, task_3, task_5].map(&:id) }
  let(:valid_params) { { bulk_task: { positions: } } }

  before(:each) { login_as(user) }

  it "allows setting positions on tasks" do
    patch "/bulk_task", params: valid_params, as: :json

    expect(task_1.reload.position).to eq 3
    expect(task_2.reload.position).to eq 2
    expect(task_3.reload.position).to eq 4
    expect(task_4.reload.position).to eq 1
    expect(task_5.reload.position).to eq 5
  end

  it "responds with success" do
    patch "/bulk_task", params: valid_params, as: :json
    expect(response).to have_http_status(:ok)
  end

  it "throws an error if given an invalid task id" do
    bad_task = create(:task)
    expect do
      patch "/bulk_task", params: { bulk_task: { positions: [bad_task.id] } }, as: :json
    end.to raise_error(ActiveRecord::RecordNotFound)
  end
end
