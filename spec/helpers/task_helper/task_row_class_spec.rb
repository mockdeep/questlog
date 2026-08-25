# frozen_string_literal: true

RSpec.describe TaskHelper, "#task_row_class" do
  it "marks every row as a task row" do
    classes = helper.task_row_class(build(:task), nil)

    expect(classes).to eq(["tasks-table__row"])
  end

  it "marks the priority of a prioritised task" do
    classes = helper.task_row_class(build(:task, priority: 2), nil)

    expect(classes).to include("tasks-table__row--priority-2")
  end

  it "marks the status of a task that has one" do
    classes = helper.task_row_class(build(:task), "pending")

    expect(classes).to include("tasks-table__row--pending")
  end
end
