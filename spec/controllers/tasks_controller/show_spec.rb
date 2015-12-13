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

  context 'when the requested tag does not exist' do
    context 'when the user is not logged in' do

      before(:each) do
        session.delete(:user_id)
        get(:show, slug: 'poo')
      end

      it 'redirects to the login page if the user is not logged in' do
        expect(response).to redirect_to('/sessions/new')
      end

      # it 'remembers the intended tag of the user' do
      #   expect(session[:return_path]).to eq tag_path('poo')
      # end

      it 'flashes a message' do
        expect(flash[:notice]).to match(/please login/i)
      end
    end

    it 'raises an error if the user is logged in' do
      expect do
        login_as(create(:free_user))
        get(:show, slug: 'poo')
      end.to raise_error(ActiveRecord::RecordNotFound)
    end
  end

end
