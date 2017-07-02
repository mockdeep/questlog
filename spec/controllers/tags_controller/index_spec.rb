RSpec.describe TagsController, '#index' do

  let(:user) { create(:user) }
  let(:task) { create(:task, user: user) }
  let(:valid_params) { { format: :json } }
  let(:estimate_tag) do
    {
      id: -2,
      name: 'Needs Estimate',
      unfinishedTasksCount: 1,
      slug: 'needs-estimate',
      priority: nil,
    }.stringify_keys
  end
  let(:all_tag) do
    {
      id: 0,
      name: 'All',
      unfinishedTasksCount: 1,
      slug: '',
      priority: nil,
    }.stringify_keys
  end
  let(:untagged_tag) do
    {
      id: -1,
      name: 'Untagged',
      unfinishedTasksCount: 1,
      slug: 'untagged',
      priority: nil,
    }.stringify_keys
  end

  before(:each) { login_as(user) }

  it 'returns only tags with tasks' do
    tag = create(:tag, user: user, tasks: [task])
    task.update(estimate_seconds: 600)
    create(:tag, user: user)
    get(:index, params: valid_params)
    tag.reload
    tag_attrs = {
      id: tag.id,
      name: tag.name,
      priority: nil,
      slug: tag.slug,
      unfinishedTasksCount: tag.unfinished_tasks_count,
    }.stringify_keys
    expected = { 'data' => [all_tag, tag_attrs] }
    expect(JSON.parse(response.body)).to eq(expected)
  end

  it 'returns an "Untagged" tag when there are untagged tasks' do
    task
    get(:index, params: valid_params)
    expected = { 'data' => [all_tag, untagged_tag, estimate_tag] }
    expect(JSON.parse(response.body)).to eq(expected)
  end

end
