RSpec.describe TagsController, "#update" do
  it "updates the tag rules" do
    tag = create(:tag)
    login_as(tag.user)

    params = { id: tag.id, tag: { rules: [{ check: "bar" }] } }
    patch(:update, params:)

    expect(tag.reload.rules).to eq([{ check: "bar" }.stringify_keys])
  end

  it "redirects to /tags" do
    tag = create(:tag)
    login_as(tag.user)

    params = { id: tag.id, tag: { rules: [{ check: "bar" }] } }
    patch(:update, params:)

    expect(response).to redirect_to("/tags")
  end
end
