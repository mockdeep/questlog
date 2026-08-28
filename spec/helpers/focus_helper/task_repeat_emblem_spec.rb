# frozen_string_literal: true

RSpec.describe FocusHelper, "#task_repeat_emblem" do
  it "marks a task that repeats" do
    emblem = helper.task_repeat_emblem(build(:task, repeat_seconds: 1.week))

    expect(emblem).to include("fa-redo-alt")
  end

  it "gives a task that does not repeat no emblem" do
    expect(helper.task_repeat_emblem(build(:task, repeat_seconds: nil)))
      .to be_nil
  end
end
