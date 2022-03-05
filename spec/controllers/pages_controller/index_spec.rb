RSpec.describe PagesController, '#index' do
  it 'renders an element for react' do
    get(:index)

    body = Capybara.string(response.body)

    expect(body).to have_selector('#app-base')
  end
end
