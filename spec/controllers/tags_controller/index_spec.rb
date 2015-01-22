RSpec.describe TagsController, '#index' do

  let(:user) { create(:user) }
  let(:task) { create(:task, user: user) }
  let(:valid_params) { { format: :json } }
  let(:all_tag) do
    {
      id: 0,
      name: 'All',
      unfinished_tasks_count: 1,
      slug: '',
      priority: nil,
    }.stringify_keys
  end

  before(:each) { login_as(user) }

  it 'returns only tags with tasks' do
    tag = create(:tag, user: user, tasks: [task])
    create(:tag, user: user)
    get(:index, valid_params)
    desired_attrs = %w(id slug unfinished_tasks_count name)
    tag_attrs = tag.reload.attributes.slice(*desired_attrs)
    tag_attrs.merge!('priority' => nil)
    expected = { 'tags' => [all_tag, tag_attrs] }
    expect(JSON.parse(response.body)).to eq(expected)
  end

end
