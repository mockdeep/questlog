# frozen_string_literal: true

RSpec.describe API::V1::TasksController, "#update" do
  let(:user) { create(:user) }
  let(:task) { create(:task, user:, estimate_seconds: 605) }
  let(:task_2) { create(:task, user:, estimate_seconds: 302) }
  let(:valid_attributes) { { title: "foo #home !3 ~5m" } }
  let(:valid_params) { { task: valid_attributes } }

  before(:each) { login_as(user) }

  it "updates the stat count for the current user when task is marked done" do
    expect do
      patch "/api/v1/tasks/#{task.id}", params: { task: { done: true } }, as: :json
    end.to change(user.stats, :count).by 1
    stat = user.stats.last
    expect(stat.value).to eq 605
    expect(stat.timestamp).to eq Time.zone.now.beginning_of_day
    expect do
      patch "/api/v1/tasks/#{task_2.id}", params: { task: { done: true } }, as: :json
    end.not_to change(user.stats, :count)
    expect(stat.reload.value).to eq 907
  end

  it "does not update the stat counter when task is not marked done" do
    expect do
      patch "/api/v1/tasks/#{task.id}", params: valid_params, as: :json
    end.not_to change(user.stats, :count)
  end

  it "updates the task appropriately" do
    patch "/api/v1/tasks/#{task.id}", params: valid_params, as: :json
    task.reload
    expect(task.title).to eq "foo"
    expect(task.tag_names).to eq ["home"]
    expect(task.priority).to eq 3
    expect(task.estimate_seconds).to eq 300
  end

  it "responds with the task as json" do
    patch "/api/v1/tasks/#{task.id}", params: valid_params, as: :json
    task = response.parsed_body["data"]
    expect(task["title"]).to eq "foo"
    expect(task["tagNames"]).to eq ["home"]
    expect(task["priority"]).to eq 3
    expect(task["estimateSeconds"]).to eq 300
  end

  it "responds with associated tags as json" do
    patch "/api/v1/tasks/#{task.id}", params: valid_params, as: :json
    tags = response.parsed_body["included"]
    expect(tags.length).to eq 1
    expect(tags.first["name"]).to eq "home"
  end
end
