require 'spec_helper'

describe UntaggedTasksController, '#show' do
  let(:task) { create(:task) }
  let(:user) { task.user }
  let(:tag) { create(:tag, user: user) }

  before(:each) do
    login_as(user)
  end

  context 'format.json' do
    it 'renders the task as json' do
      get(:show, format: :json)
      task_params = {
        id: task.id,
        priority: task.priority,
        title: task.title,
        repeat_seconds: task.repeat_seconds,
        skip_count: task.skip_count,
        tag_names: task.tag_names,
        pending: false,
      }
      expected = { task: task_params }.deep_stringify_keys
      expect(JSON.parse(response.body)).to eq expected
    end

    it 'renders "null" when there are no tasks' do
      task.destroy!
      get(:show, format: :json)
      expect(response.body).to eq 'null'
    end
  end

end
