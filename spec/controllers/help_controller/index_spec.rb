# frozen_string_literal: true

RSpec.describe HelpController, "#index" do
  it "renders the help dialog" do
    get(:index)

    expect(rendered).to have_css(".dialog-container")
      .and have_css("h3", text: "Help")
  end
end
