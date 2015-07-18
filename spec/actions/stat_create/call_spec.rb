RSpec.describe StatCreate, '#call' do

  let(:user) { create(:user) }
  let(:stat_value_class) { class_spy(StatValue, new: 42) }
  let(:stat_create) { StatCreate.new(stat_value_class: stat_value_class) }
  let(:date) { Time.zone.now.beginning_of_day }

  it 'creates a Stat if one does not exist for the current timestamp' do
    expect do
      stat_create.(user: user, value: 30, name: 'seconds-completed')
    end.to change(user.stats, :count).by(1)

    expect(stat_value_class).to have_received(:new).with(user: user, value: 30)

    stat = user.stats.last
    expect(stat.value).to eq 42
    expect(stat.timestamp).to eq date
  end

  it 'finds or initializes a Stat for the current timestamp' do
    stat = create(:stat, user: user, value: 52, timestamp: date)

    expect do
      stat_create.(user: user, value: 30, name: 'seconds-completed')
    end.to change { stat.reload.value }.to(94)

    expect(stat.timestamp).to eq date
  end

  it 'does not find a stat from a previous day' do
    old_stat = create(:stat, user: user, value: 52, timestamp: date - 1.day)
    expect do
      stat_create.(user: user, value: 30, name: 'seconds-completed')
    end.not_to change { old_stat.reload.value }
  end

end
