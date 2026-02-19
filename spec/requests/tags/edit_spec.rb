# frozen_string_literal: true

RSpec.describe TagsController, "#edit" do
  it "renders the react layout" do
    tag = create(:tag)
    login_as(tag.user)

    get "/tags/#{tag.id}/edit"

    expect(rendered).to have_css("#app-base")
  end
end
