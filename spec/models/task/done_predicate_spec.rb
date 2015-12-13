RSpec.describe Task, '#done?' do

  let(:task) { Task.new }

  it 'it returns true when done_at is present' do
    task.done_at = Time.now
    expect(task).to be_done
  end

  it 'it returns false when done_at is nil' do
    expect(task).not_to be_done
  end

end
