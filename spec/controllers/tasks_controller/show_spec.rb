RSpec.describe TasksController, '#show' do
  let(:task) { create(:task) }
  let(:user) { task.user }
  let(:task_2) { create(:task, title: 'blah') }
  let(:tag) { create(:tag, user:, tasks: [task_2], slug: 'foo') }

  before(:each) do
    login_as(user)
  end

  context 'when format is json' do
    it 'renders the task as json' do
      get(:show, format: :json)
      serial_task = {
        'doneAt' => nil,
        'estimateSeconds' => nil,
        'id' => task.id,
        'parentTaskId' => nil,
        'pending' => false,
        'position' => 1,
        'priority' => nil,
        'repeatSeconds' => nil,
        'releaseAt' => nil,
        'skipCount' => 0,
        'status' => 'active',
        'tagNames' => [],
        'tagIds' => [],
        'title' => task.title,
        'timeframe' => nil,
        'updatedAt' => task.updated_at.as_json,
      }
      expect(JSON.parse(response.body)['data']).to eq serial_task
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

  it 'renders the new task form with parent task id when format is html' do
    create(:task, user:)

    get(:show, params: { id: task.id })

    expect(rendered)
      .to have_field('task[parent_task_id]', with: task.id, type: :hidden)
  end
end
