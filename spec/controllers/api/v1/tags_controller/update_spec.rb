RSpec.describe API::V1::TagsController, '#update' do

  let(:user) { create(:user) }
  let(:tag) { create(:tag, user: user) }
  let(:rules) { [{ field: 'estimateSeconds', check: 'isBlank' }] }
  let(:valid_params) { { id: tag.id, tag: { name: 'foo tag', rules: rules } } }

  before { login_as(user) }

  it 'updates a tag with the given parameters' do
    expect do
      put(:update, params: valid_params)
    end.to change { tag.reload.name }.to('foo tag')
      .and change { tag.rules }.to(rules.map(&:stringify_keys))
  end

  it 'throws an error when tag is not associated with user' do
    tag.update!(user: create(:user))

    expect do
      put(:update, params: valid_params)
    end.to raise_error(ActiveRecord::RecordNotFound)

  end

  it 'renders JSON of the updated tag' do
    put(:update, params: valid_params)

    tag = JSON.parse(response.body).fetch('data')
    expect(tag.fetch('name')).to eq 'foo tag'
  end

end
