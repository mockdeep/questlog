# frozen_string_literal: true

RSpec.describe HelpController, '#index' do
  it 'renders the help dialog' do
    get(:index)

    expect(rendered).to have_selector('.dialog-container')
      .and have_selector('h3', text: 'Help')
  end
end
