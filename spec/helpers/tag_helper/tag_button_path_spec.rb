# frozen_string_literal: true

RSpec.describe TagHelper, "#tag_button_path" do
  it "sends the user to the tag's own page" do
    tag = build(:tag_entry, slug: "home")

    expect(helper.tag_button_path(tag)).to eq("/tags/home")
  end

  it "sends the user home for the tag standing for everything" do
    tag = build(:tag_entry, slug: "")

    expect(helper.tag_button_path(tag)).to eq("/")
  end
end
