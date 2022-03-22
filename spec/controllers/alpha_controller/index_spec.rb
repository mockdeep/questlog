# frozen_string_literal: true

RSpec.describe AlphaController, '#index' do
  it 'renders the alpha dialog' do
    get(:index)

    expect(rendered).to have_selector('.dialog-container')
      .and have_text('What does "alpha" mean?')
  end
end
