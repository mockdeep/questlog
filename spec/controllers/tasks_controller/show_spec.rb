RSpec.describe TasksController, '#show' do
  let(:task) { create(:task) }
  let(:user) { task.user }
  let(:tag) { create(:tag, user: user) }

  before(:each) do
    login_as(user)
  end

  context 'format.json' do
    it 'renders the task as json' do
      get(:show, format: :json)
      serial_task = TaskSerializer.new(task).as_json.deep_stringify_keys
      expect(JSON.parse(response.body)).to eq serial_task
    end

    it 'renders "null" when there are no tasks' do
      task.destroy!
      get(:show, format: :json)
      expect(response.body).to eq 'null'
    end
  end

  context 'when there are no unfinished tasks' do
    it '@task is nil' do
      task.update(done: true)
      get(:show, format: :json)
      expect(assigns(:task)).to be_nil
    end
  end

  context 'when there are unfinished tasks' do
    it '@task is a Task' do
      get(:show, format: :json)
      expect(assigns(:task)).to eq task
    end
  end

end
