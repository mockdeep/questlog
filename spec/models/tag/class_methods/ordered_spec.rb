require 'spec_helper'

describe Tag, '.ordered' do

  it 'returns tags ordered by name' do
    tag1 = create(:tag, name: 'bill')
    tag2 = create(:tag, name: 'alice')
    tag3 = create(:tag, name: 'charlie')
    expect(Tag.ordered).to eq [tag2, tag1, tag3]
  end

end
