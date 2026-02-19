# frozen_string_literal: true

RSpec.describe API::V1::TagsController, "#create" do
  let(:user) { create(:user) }
  let(:valid_params) { { tag: { name: "foo tag" } } }

  before { login_as(user) }

  it "creates a tag with the given parameters" do
    expect do
      post "/api/v1/tags", params: valid_params, as: :json
    end.to change(Tag, :count).by(1)

    tag = Tag.last
    expect(tag.name).to eq "foo tag"
  end

  it "associates the user with the created tag" do
    post "/api/v1/tags", params: valid_params, as: :json

    expect(Tag.last.user_id).to eq user.id
  end

  it "renders JSON of the created tag" do
    post "/api/v1/tags", params: valid_params, as: :json

    tag = response.parsed_body.fetch("data")
    expect(tag.fetch("name")).to eq "foo tag"
    expect(tag.fetch("rules")).to eq []
  end
end
