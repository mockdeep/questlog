# frozen_string_literal: true

RSpec.describe TagHelper, "#tag_button" do
  it "links to the tag's page" do
    button = helper.tag_button(build(:tag_entry), task: build(:task), slug: "")

    expect(button).to include(%(href="/tags/home"))
  end

  it "takes the browser out of the surrounding turbo frame" do
    button = helper.tag_button(build(:tag_entry), task: build(:task), slug: "")

    expect(button).to include(%(data-turbo-frame="_top"))
  end
end
