# frozen_string_literal: true

RSpec.describe TaskHelper, "#task_row_buttons" do
  it "offers to delete a task" do
    buttons = helper.task_row_buttons(build(:task, id: 1))

    expect(buttons).to include("DELETE")
  end

  it "offers to release a pending task" do
    task = build(:task, id: 1, release_at: 1.day.from_now)

    expect(helper.task_row_buttons(task)).to include("UNDO")
  end

  it "leaves a task that is not pending alone" do
    expect(helper.task_row_buttons(build(:task, id: 1))).not_to(include("UNDO"))
  end
end
