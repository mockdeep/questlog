RSpec.describe Tag::Create do

  let(:user) { create(:user) }
  let(:valid_params) { { user: user, name: 'foo tag' } }

  it 'creates a tag' do
    expect do
      described_class.(valid_params)
    end.to change(Tag, :count).by(1)

    tag = Tag.last
    expect(tag.name).to eq 'foo tag'
  end

  it 'throws an error when user is missing' do
    expect do
      described_class.(name: 'foo tag')
    end.to raise_error(ArgumentError, 'missing keyword: user')
  end

end
