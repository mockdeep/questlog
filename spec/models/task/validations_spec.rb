RSpec.describe Task, 'validations' do

  it { is_expected.to validate_presence_of(:title) }
  it { is_expected.to validate_presence_of(:user) }
  it { is_expected.to allow_value(1).for(:priority) }
  it { is_expected.to allow_value(2).for(:priority) }
  it { is_expected.to allow_value(3).for(:priority) }
  it { is_expected.to allow_value(nil).for(:priority) }
  it { is_expected.not_to allow_value(0).for(:priority) }
  it { is_expected.not_to allow_value(4).for(:priority) }
  it do
    is_expected.to validate_inclusion_of(:timeframe)
      .in_array(Timeframe::NAMES)
      .allow_nil(true)
  end

end
