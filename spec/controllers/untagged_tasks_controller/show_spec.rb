RSpec.describe UntaggedTasksController, '#show' do
  let(:task) { create(:task) }
  let(:user) { task.user }
  let(:tag) { create(:tag, user: user) }

  before(:each) do
    login_as(user)
  end

  context 'format.json' do
    it 'renders the task as json' do
      get(:show, format: :json)
      # serial_task = TaskSerializer.new(task).as_json.deep_stringify_keys
      expected = { 'task' => hash_including('id' => task.id) }
      expect(JSON.parse(response.body)).to match(expected)
    end

    it 'renders "null" when there are no tasks' do
      task.destroy!
      get(:show, format: :json)
      expect(response.body).to eq 'null'
    end
  end

end
