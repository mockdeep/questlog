require 'spec_helper'

describe TasksController do
  let(:task) { create(:task) }
  let(:user) { task.user }
  let(:valid_params) { attributes_for(:task) }
  let(:context) { create(:context, user: user) }

  describe '#show' do
    before(:each) do
      login_as(user)
    end

    it 'initializes a new Task' do
      get(:show)
      expect(assigns(:new_task)).to be_new_record
    end

    context 'when there are no unfinished tasks' do
      it '@task is nil' do
        task.update_attributes(done: true)
        get(:show)
        expect(assigns(:task)).to be_nil
      end
    end

    context 'when there are unfinished tasks' do
      it '@task is a Task' do
        get(:show)
        expect(assigns(:task)).to eq task
      end
    end

    it 'skips contexts without tasks' do
      context
      get(:show)
      expect(assigns(:contexts)).to eq []
    end

    it 'sets contexts with tasks' do
      context.tasks << task
      get(:show)
      expect(assigns(:contexts)).to eq [context]
    end
  end

  describe '#create' do
    before(:each) do
      request.env['HTTP_REFERER'] = root_url
    end

    context 'when the user does not exist' do
      it 'creates a new user' do
        expect do
          post(:create, task: valid_params)
        end.to change(User, :count).by(1)
      end

      it 'sets the current user in the session' do
        expect(session[:user_id]).to be_nil
        post(:create, task: valid_params)
        expect(session[:user_id]).not_to be_nil
      end
    end

    context 'when the task is valid' do
      it 'redirects to root' do
        post(:create, task: valid_params)
        expect(response).to redirect_to(root_path)
      end
    end

    context 'when the task is not valid' do
      it 'renders :show' do
        Task.any_instance.stub(:save).and_return(false)
        post(:create, task: valid_params)
        expect(response).to render_template('tasks/show')
      end
    end
  end

  describe '#destroy' do
    before(:each) do
      login_as(user)
    end

    it 'destroys the task for the given user' do
      request.env['HTTP_REFERER'] = '/whatevs'
      task.contexts = [context]
      expect(context.tasks).to eq([task])
      expect(context.reload.tasks_count).to eq(1)
      delete(:destroy, id: task.id)

      expect(context.reload.tasks).to eq([])
      expect(context.tasks_count).to eq(0)
    end
  end
end
