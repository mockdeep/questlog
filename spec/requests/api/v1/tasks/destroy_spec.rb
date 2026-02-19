# frozen_string_literal: true

RSpec.describe API::V1::TasksController, "#destroy" do
  let(:task) { create(:task) }
  let(:user) { task.user }
  let(:tag) { create(:tag, user:) }

  before(:each) do
    login_as(user)
  end

  it "destroys the task for the given user" do
    task.tags = [tag]
    expect(tag.tasks).to eq([task])
    expect(tag.reload.unfinished_tasks_count).to eq(1)
    delete "/api/v1/tasks/#{task.id}", as: :json

    expect(tag.reload.tasks).to eq([])
    expect(tag.unfinished_tasks_count).to eq 0
    expect(user.reload.unfinished_tasks_count).to eq 0
  end

  it "allows deletion of pending tasks" do
    task.update!(done: true, release_at: 1.hour.from_now)
    expect { delete "/api/v1/tasks/#{task.id}", as: :json }.not_to raise_error
  end
end
