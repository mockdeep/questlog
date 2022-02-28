RSpec.describe SessionsController, '#new' do
  it 'renders the react layout' do
    get(:new)

    expect(rendered).to have_selector('#app-base')
  end
end
