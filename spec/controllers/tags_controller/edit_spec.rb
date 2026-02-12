RSpec.describe TagsController, "#edit" do
  it "renders the react layout" do
    tag = create(:tag)
    login_as(tag.user)

    get(:edit, params: { id: tag.id })

    expect(rendered).to have_css("#app-base")
  end
end
