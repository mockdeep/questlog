RSpec.describe Tag, 'validations' do

  it { is_expected.to validate_presence_of(:name) }
  it { is_expected.to validate_presence_of(:user) }

  it { is_expected.to validate_uniqueness_of(:name).scoped_to(:user_id) }

end
