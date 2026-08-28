# frozen_string_literal: true

RSpec.describe TagHelper, "#tag_button_classes" do
  def classes_for(tag, task: build(:task), slug: "")
    helper.tag_button_classes(tag, task:, slug:)
  end

  it "singles out the tag being looked at" do
    expect(classes_for(build(:tag_entry, slug: "home"), slug: "home"))
      .to include("active")
  end

  it "leaves the other tags alone" do
    expect(classes_for(build(:tag_entry, slug: "work"), slug: "home"))
      .not_to(include("active"))
  end

  it "singles out All when no tag is being looked at" do
    expect(classes_for(build(:tag_entry, name: "All", slug: "")))
      .to include("active")
  end

  it "marks the tags the task on show carries" do
    task = create(:task, tags: [create(:tag)])

    expect(classes_for(build(:tag_entry, id: task.tag_ids.first), task:))
      .to include("current")
  end

  it "leaves the tags the task on show does not carry alone" do
    expect(classes_for(build(:tag_entry), task: build(:task)))
      .not_to(include("current"))
  end

  it "colours a tag by the priority of the work waiting under it" do
    expect(classes_for(build(:tag_entry, priority: 2)))
      .to include("priority-2-btn")
  end

  it "leaves a tag with no urgent work uncoloured" do
    expect(classes_for(build(:tag_entry, priority: nil)))
      .to eq(["button", "btn", "btn-default"])
  end
end
