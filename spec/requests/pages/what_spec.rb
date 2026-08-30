# frozen_string_literal: true

RSpec.describe PagesController, "#what" do
  it "links to the pages it describes" do
    get "/what"

    expect(rendered).to have_link("Focus Page", href: "/")
      .and have_link("Timeframes Page", href: "/timeframes")
  end
end
