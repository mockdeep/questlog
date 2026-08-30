# frozen_string_literal: true

RSpec.describe PagesController, "#privacy" do
  it "states what the data is and is not used for" do
    get "/privacy"

    expect(rendered).to have_text("We won't sell your data.")
      .and have_text("We will use your data to make Questlog better.")
  end
end
