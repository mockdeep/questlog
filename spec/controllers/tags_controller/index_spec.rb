RSpec.describe TagsController, '#index' do
  it 'renders the react layout' do
    get(:index)

    expect(rendered).to have_selector('#app-base')
  end
end
