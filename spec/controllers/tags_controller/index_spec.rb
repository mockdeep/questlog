RSpec.describe TagsController, '#index' do

  let(:user) { create(:user) }
  let(:task) { create(:task, user: user) }
  let(:valid_params) { { format: :json } }
  let(:all_tag) { user.reload.as_json.stringify_keys }

  before(:each) { login_as(user) }

  it 'returns only tags with tasks' do
    tag = create(:tag, user: user, tasks: [task])
    create(:tag, user: user)
    get(:index, valid_params)
    expected = { 'tags' => [all_tag, tag.reload.as_json.stringify_keys] }
    expect(JSON.parse(response.body)).to eq(expected)
  end

end
