# frozen_string_literal: true

RSpec.describe LinkHelper, "#task_link_to" do
  it "links to the task's own page" do
    link = helper.task_link_to("do laundry", build(:task, id: 1))

    expect(link).to include(%(href="/tasks/1"))
  end

  it "marks the link as a task link" do
    link = helper.task_link_to("do laundry", build(:task, id: 1))

    expect(link).to include(%(class="task-link"))
  end

  it "takes the browser out of the surrounding turbo frame" do
    link = helper.task_link_to("do laundry", build(:task, id: 1))

    expect(link).to include(%(data-turbo-frame="_top"))
  end
end
