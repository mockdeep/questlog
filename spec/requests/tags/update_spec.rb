# frozen_string_literal: true

RSpec.describe TagsController, "#update" do
  it "updates the tag rules" do
    tag = create(:tag)
    login_as(tag.user)

    params = { tag: { rules: [{ check: "bar" }] } }
    patch "/tags/#{tag.id}", params: params

    expect(tag.reload.rules).to eq([{ check: "bar" }.stringify_keys])
  end

  it "pairs each rule's field with its check in submission order" do
    tag = create(:tag)
    login_as(tag.user)

    patch "/tags/#{tag.id}", params: encoded_rules

    expect(tag.reload.rules).to eq(paired_rules)
  end

  it "redirects to /tags" do
    tag = create(:tag)
    login_as(tag.user)

    params = { tag: { rules: [{ check: "bar" }] } }
    patch "/tags/#{tag.id}", params: params

    expect(response).to redirect_to("/tags")
  end

  def encoded_rules
    [
      "tag[rules][][field]=estimateSeconds",
      "tag[rules][][check]=isBlank",
      "tag[rules][][field]=tagIds",
      "tag[rules][][check]=isEmpty",
    ].join("&")
  end

  def paired_rules
    [
      { field: "estimateSeconds", check: "isBlank" },
      { field: "tagIds", check: "isEmpty" },
    ].map(&:stringify_keys)
  end
end
