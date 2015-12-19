RSpec.describe TasksController, '#create' do

  let(:valid_params) { { format: :json, task: attributes_for(:task) } }

  before(:each) do
    request.env['HTTP_REFERER'] = root_url
  end

  context 'when the user does not exist' do
    it 'creates a new user' do
      expect do
        post(:create, valid_params)
      end.to change(User, :count).by(1)
    end

    it 'sets the current user in the session' do
      expect(session[:user_id]).to be_nil
      post(:create, valid_params)
      expect(session[:user_id]).not_to be_nil
    end
  end

  context 'when the task is valid' do
    it 'renders status Created' do
      post(:create, valid_params)
      expect(response.status_message).to eq 'Created'
      expect(response.status).to eq 201
    end

    it 'creates the task' do
      expect do
        post(:create, valid_params)
      end.to change(Task, :count).by(1)
    end

    it 'renders the task as json' do
      post(:create, valid_params.merge(task: { title: 'abc123 #home' }))
      task = JSON.parse(response.body)['task']
      expect(task['title']).to eq('abc123')
      expect(task['tag_names']).to eq(['home'])
    end
  end

end
