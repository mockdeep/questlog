RSpec.describe Task, '#status' do

  it 'returns "pending" when "release_at" is present' do
    task = Task.new(release_at: 1.day.from_now)

    expect(task.status).to eq 'pending'

    task.done_at = 1.week.ago

    expect(task.status).to eq 'pending'
  end

  it 'returns "done" when "release_at" is not present and "done_at" is' do
    task = Task.new(done_at: 1.week.ago)

    expect(task.status).to eq 'done'
  end

  it 'returns "active" when there is no "release_at" or "done_at"' do
    task = Task.new

    expect(task.status).to eq 'active'
  end

end
