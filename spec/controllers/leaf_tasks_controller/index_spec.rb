# frozen_string_literal: true

RSpec.describe LeafTasksController, '#index' do
  it 'renders a react container' do
    get(:index)

    expect(rendered).to have_selector('#app-base')
  end
end
