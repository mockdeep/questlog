RSpec.describe Task, '#postpone=' do

  let(:task) { build(:task) }

  it 'sets the done_at' do
    freeze_time do
      task.postpone = 5.minutes
      expect(task.done_at).to eq Time.zone.now
    end
  end

  it 'sets the release_at' do
    freeze_time do
      task.postpone = 5.minutes
      expect(task.release_at).to eq 5.minutes.from_now
    end
  end

  it 'increments the skip_count' do
    expect do
      task.postpone = 5.minutes
    end.to change(task, :skip_count).from(0).to(1)
  end

end
