require 'spec_helper'

describe TasksController, '#create' do

  let(:valid_params) { attributes_for(:task) }

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
