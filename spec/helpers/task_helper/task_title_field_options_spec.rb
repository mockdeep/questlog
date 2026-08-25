# frozen_string_literal: true

RSpec.describe TaskHelper, "#task_title_field_options" do
  it "leaves the field without an id, since a page holds many of them" do
    expect(helper.task_title_field_options).to include(id: nil)
  end

  it "hands the field to the controller that saves and sizes it" do
    data = helper.task_title_field_options[:data]

    expect(data).to include(controller: "task-title")
  end
end
