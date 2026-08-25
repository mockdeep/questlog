# frozen_string_literal: true

RSpec.describe TaskHelper, "#task_action_button" do
  it "labels the button" do
    button = helper.task_action_button("DONE", build(:task, id: 1), done: true)

    expect(button).to include(">DONE</button>")
  end

  it "sends the given attributes to the task" do
    button = helper.task_action_button("DONE", build(:task, id: 1), done: true)

    expect(button).to include(%(name="task[done]" value="true"))
  end

  it "keeps its form out of the layout" do
    button = helper.task_action_button("DONE", build(:task, id: 1), done: true)

    expect(button).to include(%(class="contents-form"))
  end
end
