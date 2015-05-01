RSpec.describe StatCreate, '#call' do

  let(:mock_stat) { class_spy(Stat) }
  let(:stat_create) { StatCreate.new(stat_class: mock_stat) }
  let(:date) { 1.month.ago }

  it 'creates a Stat' do
    stat_create.(user: 'foo', value: 30, timestamp: date)

    expected_args = { user: 'foo', value: 30, timestamp: date.to_date }
    expect(mock_stat).to have_received(:create!).with(expected_args)
  end

end
