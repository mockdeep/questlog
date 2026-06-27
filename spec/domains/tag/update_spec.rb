# frozen_string_literal: true

RSpec.describe Tag::Update do
  let(:tag) { create(:tag) }
  let(:valid_params) { { name: "foo tag" } }

  it "updates the tag" do
    expect do
      described_class.(tag, valid_params)
    end.to change { tag.reload.name }.to("foo tag")
  end

  it "removes duplicate rules" do
    rule = { check: "isEmpty", field: "tagIds" }

    described_class.(tag, { rules: [rule, rule.dup] })

    expect(tag.reload.rules).to eq([rule.stringify_keys])
  end
end
