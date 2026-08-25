# frozen_string_literal: true

RSpec.describe TagList, ".for" do
  it "returns the built in tags followed by the user's own tags" do
    user = create(:user)
    create(:tag, user:, name: "beta")
    create(:tag, user:, name: "alpha")
    names = described_class.for(user:).map(&:name)

    expect(names).to eq(["All", "Untagged", "Needs Estimate", "alpha", "beta"])
  end

  it "gives the built in tags their slugs" do
    slugs = described_class.for(user: create(:user)).first(3).map(&:slug)

    expect(slugs).to eq(["", "untagged", "needs-estimate"])
  end

  it "gives the All tag a rule matching every task" do
    tag = described_class.for(user: create(:user)).first

    expect(tag.rules.map(&:symbolize_keys)).to eq([{ check: "isActive" }])
  end

  it "gives the Untagged tag a rule matching tasks without tags" do
    tag = described_class.for(user: create(:user)).second
    rule = { check: "isEmpty", field: "tagIds" }

    expect(tag.rules.map(&:symbolize_keys)).to eq([rule])
  end

  it "gives the Needs Estimate tag a rule matching unestimated tasks" do
    tag = described_class.for(user: create(:user)).third
    rule = { check: "isBlank", field: "estimateSeconds" }

    expect(tag.rules.map(&:symbolize_keys)).to eq([rule])
  end
end
