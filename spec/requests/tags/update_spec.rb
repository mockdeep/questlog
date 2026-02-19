# frozen_string_literal: true

RSpec.describe TagsController, "#update" do
  it "updates the tag rules" do
    tag = create(:tag)
    login_as(tag.user)

    params = { tag: { rules: [{ check: "bar" }] } }
    patch "/tags/#{tag.id}", params: params

    expect(tag.reload.rules).to eq([{ check: "bar" }.stringify_keys])
  end

  it "redirects to /tags" do
    tag = create(:tag)
    login_as(tag.user)

    params = { tag: { rules: [{ check: "bar" }] } }
    patch "/tags/#{tag.id}", params: params

    expect(response).to redirect_to("/tags")
  end
end
