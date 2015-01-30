RSpec.describe Task, '#highest_priority' do

  it 'returns the highest task priority' do
    create(:task)
    expect(Task.highest_priority).to be_nil
    create(:task, priority: 2)
    expect(Task.highest_priority).to be 2
    create(:task, priority: 1)
    expect(Task.highest_priority).to be 1
  end

end
