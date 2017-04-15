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
      expected = { 'data' => hash_including('id' => task.id) }
      expect(JSON.parse(response.body)).to match(expected)
    end

    it 'renders "null" when there are no tasks' do
      task.destroy!
      get(:show, format: :json)
      expect(JSON.parse(response.body)).to eq('data' => nil)
    end
  end

end
