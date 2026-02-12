RSpec.describe User, "#next_task" do
  let(:tag) { create(:tag, user:) }
  let(:task_1) { create(:task, user:) }
  let(:task_2) { create(:task, user:) }
  let(:user) { create(:user) }

  context "when a tag_id parameter is passed" do
    it "returns the next task for that tag" do
      task_1
      task_2.tags << tag
      expect(user.next_task).to eq task_1
      expect(user.next_task(tag.id)).to eq task_2
    end
  end

  it "returns the next undone task" do
    task_1
    task_2
    expect(user.next_task).to eq task_1
    task_1.update(done: true)
    expect(user.next_task).to eq task_2
    task_2.update(done: true)
    expect(user.reload.next_task).to be_nil
  end
end
