RSpec.describe Task, "#tag_names" do
  let(:user) { create(:user) }
  let(:task) { build(:task, user:) }
  let(:tag_1) { create(:tag, user:) }
  let(:tag_2) { create(:tag, user:) }

  context "after save" do
    it "sets the tags for the task" do
      task.update!(tag_names: [tag_1.name])
      expect(task.tags).to eq [tag_1]
    end

    it "increments the counter for the associated tag" do
      expect do
        task.update!(tag_names: [tag_1.name])
      end.to change { tag_1.reload.unfinished_tasks_count }.from(0).to(1)
    end

    it "decrements the counter for tags removed" do
      task.update!(tag_names: [tag_1.name])
      expect do
        task.update!(tag_names: [tag_2.name])
      end.to change { tag_1.reload.unfinished_tasks_count }.from(1).to(0)
    end
  end

  context "when the task is invalid" do
    it "does not increment associated counters" do
      expect(tag_1.reload.unfinished_tasks_count).to eq 0
      task.update(title: "", tag_names: [tag_1.name])
      expect(tag_1.reload.unfinished_tasks_count).to eq 0
    end
  end
end
