RSpec.describe Tag::Update do

  let(:tag) { create(:tag) }
  let(:valid_params) { { name: 'foo tag' } }

  it 'updates the tag' do
    expect do
      described_class.(tag, valid_params)
    end.to change { tag.reload.name }.to('foo tag')
  end

end
