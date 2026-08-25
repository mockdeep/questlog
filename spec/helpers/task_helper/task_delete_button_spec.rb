# frozen_string_literal: true

RSpec.describe TaskHelper, "#task_delete_button" do
  it "deletes the task" do
    button = helper.task_delete_button(build(:task, id: 1))

    expect(button).to include(%(name="_method" value="delete"))
  end

  it "asks before deleting" do
    button = helper.task_delete_button(build(:task, id: 1))

    expect(button).to include(%(data-turbo-confirm="Delete this task?"))
  end
end
