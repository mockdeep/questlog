RSpec.describe NeedsEstimateController, '#show' do

  let(:task) { create(:task) }
  let(:user) { task.user }

  before(:each) { login_as(user) }

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
        estimate_seconds: nil,
        pending: false,
      }
      expected = { task: task_params }.deep_stringify_keys
      expect(JSON.parse(response.body)).to eq expected
    end

    it 'renders "null" when there are no tasks' do
      task.update_attributes!(estimate_seconds: 600)
      get(:show, format: :json)
      expect(response.body).to eq 'null'
    end
  end
end
