# frozen_string_literal: true

RSpec.describe FocusHelper, "#focus_task_classes" do
  it "colours the task by its priority" do
    classes = helper.focus_task_classes(build(:task, priority: 2))

    expect(classes).to include("priority-2")
  end

  it "leaves a task with no priority uncoloured" do
    classes = helper.focus_task_classes(build(:task, priority: nil))

    expect(classes).to eq(["col-md-12", "task-display"])
  end

  it "marks a task the user keeps skipping" do
    classes = helper.focus_task_classes(build(:task, skip_count: 15))

    expect(classes).to include("over-skipped")
  end

  it "leaves a task the user has not skipped much alone" do
    classes = helper.focus_task_classes(build(:task, skip_count: 14))

    expect(classes).not_to(include("over-skipped"))
  end
end
