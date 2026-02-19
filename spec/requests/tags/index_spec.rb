# frozen_string_literal: true

RSpec.describe TagsController, "#index" do
  it "renders tags for the current user, ordered by name" do
    user = create(:user)
    login_as(user)
    create(:tag, user:, name: "At home")

    get "/tags"

    expect(rendered.find(".tag-row")).to have_content("At home")
  end
end
