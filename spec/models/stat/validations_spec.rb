RSpec.describe Stat, 'validations' do

  it { is_expected.to validate_presence_of(:user_id) }
  it { is_expected.to validate_uniqueness_of(:timestamp).scoped_to(:user_id) }

end
