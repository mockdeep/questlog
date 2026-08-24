# frozen_string_literal: true

RSpec.describe TagRule, ".field_for" do
  it "returns the field the rule names" do
    field = described_class.field_for({ field: "tagIds" })

    expect(field[:label]).to eq("Tags")
  end

  it "defaults to the first field when the rule names none" do
    field = described_class.field_for({})

    expect(field[:label]).to eq("Estimate Seconds")
  end

  it "raises when the rule names an unknown field" do
    expect { described_class.field_for({ field: "bogus" }) }
      .to raise_error(ArgumentError, /unknown rule field: bogus/)
  end
end
