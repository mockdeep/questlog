require 'spec_helper'

describe TasksController, '#show' do
  let(:task) { create(:task) }
  let(:user) { task.user }
  let(:context) { create(:context, user: user) }

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
    expect do
      task.contexts << context
    end.to change { context.reload.unfinished_tasks_count }.from(0).to(1)

    get(:show)
    expect(assigns(:contexts)).to eq [context]
  end

  context 'when the requested context does not exist' do
    context 'when the user is not logged in' do

      before(:each) do
        session.delete(:user_id)
        get(:show, slug: 'poo')
      end

      it 'redirects to the login page if the user is not logged in' do
        expect(response).to redirect_to(new_session_path)
      end

      it 'remembers the intended tag of the user' do
        expect(session[:return_path]).to eq context_path('poo')
      end

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
