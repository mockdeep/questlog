RSpec.describe User, '#next_task' do

  let(:tag) { create(:tag, user: user) }
  let(:task1) { create(:task, user: user) }
  let(:task2) { create(:task, user: user) }
  let(:user) { create(:user) }

  context 'when a tag_id parameter is passed' do
    it 'returns the next task for that tag' do
      task1
      task2.tags << tag
      expect(user.next_task).to eq task1
      expect(user.next_task(tag.id)).to eq task2
    end
  end

  it 'returns the next undone task' do
    task1
    task2
    expect(user.next_task).to eq task1
    task1.update(done: true)
    expect(user.next_task).to eq task2
    task2.update(done: true)
    expect(user.reload.next_task).to be_nil
  end
end
