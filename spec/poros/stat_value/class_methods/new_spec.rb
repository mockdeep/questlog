RSpec.describe StatValue, '#new' do

  let(:user) { create(:user) }
  let(:task) { create(:task, user: user) }

  it 'returns the value if given' do
    expect(described_class.new(user: user, value: 59)).to eq 59
  end

  context 'when value is not given' do
    it 'returns 30 minutes when the time since last done < 1 minute' do
      freeze_time do
        task.update!(done_at: Time.zone.now)
        expect(described_class.new(user: user, value: nil)).to eq 30.minutes
      end
    end

    it 'returns 30 minutes when the time since last done >= 30 minutes' do
      freeze_time do
        task.update!(done_at: 45.minutes.ago)
        expect(described_class.new(user: user, value: nil)).to eq 30.minutes
      end
    end

    it 'returns the time since last done if >= 1 and < 30 minutes' do
      freeze_time do
        task.update!(done_at: 15.minutes.ago)
        expect(described_class.new(user: user, value: nil)).to eq 15.minutes
      end
    end

    it 'returns 30 minutes if there are no done tasks' do
      expect(described_class.new(user: user, value: nil)).to eq 30.minutes
    end
  end
end
