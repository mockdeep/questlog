# frozen_string_literal: true

RSpec.describe API::V1::TagsController, "#update" do
  let(:user) { create(:user) }
  let(:tag) { create(:tag, user:) }
  let(:rules) { [{ field: "estimateSeconds", check: "isBlank" }] }
  let(:valid_params) { { tag: { name: "foo tag", rules: } } }

  before { login_as(user) }

  it "updates a tag with the given parameters" do
    expect do
      patch "/api/v1/tags/#{tag.id}", params: valid_params, as: :json
    end.to change { tag.reload.name }.to("foo tag")
      .and change(tag, :rules).to(rules.map(&:stringify_keys))
  end

  it "throws an error when tag is not associated with user" do
    tag.update!(user: create(:user))

    expect do
      patch "/api/v1/tags/#{tag.id}", params: valid_params, as: :json
    end.to raise_error(ActiveRecord::RecordNotFound)
  end

  it "renders JSON of the updated tag" do
    patch "/api/v1/tags/#{tag.id}", params: valid_params, as: :json

    tag = response.parsed_body.fetch("data")
    expect(tag.fetch("name")).to eq "foo tag"
  end
end
