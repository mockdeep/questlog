RSpec.describe TasksController, '#show' do
  let(:task) { create(:task) }
  let(:user) { task.user }
  let(:task_2) { create(:task, title: 'blah') }
  let(:tag) { create(:tag, user: user, tasks: [task_2], slug: 'foo') }

  before(:each) do
    login_as(user)
  end

  context 'format.json' do
    it 'renders the task as json' do
      get(:show, format: :json)
      serial_task = {
        'data' => {
          'estimateSeconds' => nil,
          'id' => task.id,
          'parentTaskId' => nil,
          'pending' => false,
          'position' => 1,
          'priority' => nil,
          'repeatSeconds' => nil,
          'releaseAt' => nil,
          'skipCount' => 0,
          'tagNames' => [],
          'tagIds' => [],
          'title' => task.title,
          'timeframe' => nil,
        },
      }
      expect(JSON.parse(response.body)).to eq serial_task
    end

    it 'renders "null" when there are no tasks' do
      task.destroy!
      get(:show, params: { format: :json })
      expect(JSON.parse(response.body)).to eq('data' => nil)
    end

    it 'renders tasks associated with a tag given a slug' do
      get(:show, params: { format: :json, slug: tag.slug })
      expect(JSON.parse(response.body)['data']['title']).to eq 'blah'
    end
  end

end
