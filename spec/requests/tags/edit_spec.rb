# frozen_string_literal: true

RSpec.describe TagsController, "#edit" do
  it "renders the react layout" do
    tag = create(:tag)
    login_as(tag.user)

    get "/tags/#{tag.id}/edit"

    expect(rendered).to have_css("#app-base")
  end

  it "passes the selectable rule fields to the react component" do
    tag = create(:tag)
    login_as(tag.user)

    get "/tags/#{tag.id}/edit"

    expect(rule_field_names).to eq(["estimateSeconds", "tagIds"])
  end

  def mount_props
    element = rendered.find("[data-react-props-value]")

    JSON.parse(element["data-react-props-value"])
  end

  def rule_field_names
    mount_props["ruleFields"].map { |field| field["name"] }
  end
end
