RSpec.describe API::V1::TasksController, '#index' do

  let(:user) { create(:user) }

  before { login_as(user) }

  it 'renders json of undone and pending tasks for the user' do
    task_1 = create(:task, user: user)
    create(:task, done_at: 1.week.ago, user: user)
    task_3 = create(
      :task,
      done_at: 1.week.ago,
      release_at: 1.week.from_now,
      user: user,
    )

    get(:index)

    tasks = JSON.parse(response.body).fetch('data')
    expect(tasks.length).to eq 2
    expect(tasks.first.fetch('title')).to eq task_1.title
    expect(tasks.last.fetch('title')).to eq task_3.title
  end

  it 'renders json of tags for the user' do
    tag_1 = create(:tag, user: user)
    tag_2 = create(:tag, user: user)

    get(:index)

    tags = JSON.parse(response.body).fetch('included')
    expect(tags.length).to eq 3
    expect(tags.first.fetch('name')).to eq 'All'
    expect(tags.second.fetch('name')).to eq tag_1.name
    expect(tags.last.fetch('name')).to eq tag_2.name
  end

end
