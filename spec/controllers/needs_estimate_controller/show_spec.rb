RSpec.describe NeedsEstimateController, '#show' do

  let(:task) { create(:task) }
  let(:user) { task.user }

  before(:each) { login_as(user) }

  context 'format.json' do
    it 'renders the task as json' do
      get(:show, format: :json)
      serial_task = {
        'task' => hash_including('id' => task.id, 'estimateSeconds' => nil),
      }

      expect(JSON.parse(response.body)).to match serial_task
    end

    it 'renders "null" when there are no tasks' do
      task.update!(estimate_seconds: 600)
      get(:show, format: :json)
      expect(JSON.parse(response.body)).to eq('task' => nil)
    end
  end
end
