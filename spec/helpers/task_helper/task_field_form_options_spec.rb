# frozen_string_literal: true

RSpec.describe TaskHelper, "#task_field_form_options" do
  it "sends the field to the task it belongs to" do
    options = helper.task_field_form_options(build(:task, id: 1))

    expect(options).to include(url: "/tasks/1", method: :patch)
  end

  it "submits as soon as the field is changed" do
    options = helper.task_field_form_options(build(:task, id: 1))

    expect(options[:data]).to include(controller: "auto-submit")
  end
end
