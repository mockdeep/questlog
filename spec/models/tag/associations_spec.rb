RSpec.describe Tag, 'associations' do

  it { is_expected.to belong_to(:user) }

  it { is_expected.to have_many(:taggings).dependent(:destroy) }
  it { is_expected.to have_many(:tasks).through(:taggings) }

end
