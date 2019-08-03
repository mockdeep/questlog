RSpec.describe Tag, '.ordered' do

  it 'returns tags ordered by name' do
    tag_1 = create(:tag, name: 'bill')
    tag_2 = create(:tag, name: 'alice')
    tag_3 = create(:tag, name: 'charlie')
    expect(described_class.ordered).to eq [tag_2, tag_1, tag_3]
  end

end
