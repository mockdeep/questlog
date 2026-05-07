# frozen_string_literal: true

RSpec.describe "landing pages" do
  it "lets you view the privacy page" do
    visit "/privacy"
    expect(page).to have_text("We won't sell your data")
  end

  it "lets you view the what page" do
    visit "/what"
    expect(page).to have_text("What's a Questlog?")
  end
end
