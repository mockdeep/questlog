# frozen_string_literal: true

RSpec.describe TagsController, "#edit" do
  it "renders a row for each of the tag's rules" do
    tag = create(:tag, rules: [{ field: "tagIds", check: "isEmpty" }])
    login_as(tag.user)

    get "/tags/#{tag.id}/edit"

    expect(rendered).to have_css("li", count: 1)
  end

  it "selects the field the rule was saved with" do
    tag = create(:tag, rules: [{ field: "tagIds", check: "isEmpty" }])
    login_as(tag.user)

    get "/tags/#{tag.id}/edit"

    expect(selected_options).to eq(["Tags", "is empty"])
  end

  it "disables the check dropdowns of the unselected fields" do
    tag = create(:tag, rules: [{ field: "tagIds", check: "isEmpty" }])
    login_as(tag.user)

    get "/tags/#{tag.id}/edit"

    expect(enabled_check_fields).to eq(["tagIds"])
  end

  def selected_options
    rendered.find("li").all("option[selected]", visible: :all).map(&:text)
  end

  def enabled_check_fields
    selector = "li select[data-check-field]:not([disabled])"
    selects = rendered.all(selector, visible: :all)

    selects.map { |select| select["data-check-field"] }
  end
end
