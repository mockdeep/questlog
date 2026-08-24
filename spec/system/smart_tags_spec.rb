# frozen_string_literal: true

RSpec.describe "editing smart tags" do
  let(:user) { create(:user) }

  it "allows selecting rules from dropdowns" do
    system_login_as(user)
    tag = create(:tag, name: "my tag", user:)
    visit "/tags"

    within(".tag-row", text: tag.name) { click_link("Edit") }

    expect(page).to have_text("Editing tag #{tag.name}")
    expect(page).to have_no_selector("li")
    click_button("Add Rule")
    expect(page).to have_css("li", count: 1)
    click_button("Save Tag")

    within(".tag-row", text: tag.name) { click_link("Edit") }
    expect(page).to have_css("li", count: 1)
    within("li") do
      fields, checks = find_all("select").to_a
      expect(fields.value).to eq "estimateSeconds"
      expect(checks.value).to eq "isBlank"

      fields.find(:option, text: "Tags").select_option
      checks = find_all("select").last
      expect(checks.value).to eq "isEmpty"
    end

    click_button("Add Rule")
    click_button("Add Rule")
    click_button("Add Rule")

    expect(page).to have_css("li", count: 4)

    dismiss_confirm { click_button("Save Tag") }
    accept_confirm { click_button("Save Tag") }

    within(".tag-row", text: tag.name) { click_link("Edit") }

    expect(page).to have_css("li", count: 2)
    expect(rule_values).to eq(
      [["tagIds", "isEmpty"], ["estimateSeconds", "isBlank"]],
    )

    # visit '/'

    # expect(page).to have_no_selector('a', text: tag.name)
    # add_task('some random task')
    # expect(page).to have_selector('a', text: tag.name)
  end

  it "allows deleting a rule" do
    system_login_as(user)
    tag = create(:tag, name: "my tag", rules: two_rules, user:)
    visit "/tags"

    within(".tag-row", text: tag.name) { click_link("Edit") }

    expect(page).to have_css("li", count: 2)

    first("li").find("i.fa-times").click

    expect(page).to have_css("li", count: 1)
    expect(rule_values).to eq([["estimateSeconds", "isBlank"]])

    click_button("Save Tag")

    within(".tag-row", text: tag.name) { click_link("Edit") }

    expect(page).to have_css("li", count: 1)
    expect(rule_values).to eq([["estimateSeconds", "isBlank"]])
  end

  def two_rules
    [
      { field: "tagIds", check: "isEmpty" },
      { field: "estimateSeconds", check: "isBlank" },
    ]
  end

  def rule_values
    all("li").map { |rule| rule.all("select").map(&:value) }
  end
end
