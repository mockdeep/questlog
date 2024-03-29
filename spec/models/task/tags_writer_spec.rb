RSpec.describe Task, '#tags=' do
  let(:user) { create(:user) }
  let(:task) { create(:task, user:) }
  let(:tag) { create(:tag, user:) }

  it 'updates counters on the tags' do
    expect do
      task.tags = [tag]
    end.to change { tag.reload.unfinished_tasks_count }.by(1)
  end
end
