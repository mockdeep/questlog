RSpec.describe NeedsEstimateController, '#show' do

  let(:task) { create(:task) }
  let(:user) { task.user }

  before(:each) { login_as(user) }

  context 'format.json' do
    it 'renders the task as json' do
      get(:show, format: :json)
      serial_task = TaskSerializer.new(task).as_json.deep_stringify_keys
      expect(JSON.parse(response.body)).to eq serial_task
    end

    it 'renders "null" when there are no tasks' do
      task.update!(estimate_seconds: 600)
      get(:show, format: :json)
      expect(response.body).to eq 'null'
    end
  end
end
