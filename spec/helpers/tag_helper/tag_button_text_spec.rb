# frozen_string_literal: true

RSpec.describe TagHelper, "#tag_button_text" do
  it "names the tag and counts what it claims" do
    tag = build(:tag_entry, name: "home", tasks: [build(:task), build(:task)])

    expect(helper.tag_button_text(tag)).to eq("home (2)")
  end
end
