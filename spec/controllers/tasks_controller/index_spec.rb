RSpec.describe TasksController, '#index' do

  let(:user) { create(:user) }

  before { login_as(user) }

  it 'renders all incomplete tasks for the user' do
    create(:task, user: user, done_at: 1.week.ago)
    task_2 = create(
      :task,
      user: user,
      done_at: 1.week.ago,
      release_at: 1.week.from_now,
    )
    task_3 = create(:task, user: user)

    get(:index, format: :json)

    serial_tasks = {
      'tasks' => [
        hash_including(
          'id' => task_3.id,
          'releaseAt' => nil,
          'pending' => false,
        ),
        hash_including(
          'id' => task_2.id,
          'releaseAt' => task_2.release_at.as_json,
          'pending' => true,
        ),
      ],
    }

    expect(JSON.parse(response.body)).to match serial_tasks
  end

end
