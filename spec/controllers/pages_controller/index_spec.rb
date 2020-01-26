RSpec.describe PagesController, '#index' do
  it 'renders blank html' do
    get(:index)

    body = Capybara.string(response.body)
    app_base = body.find('#app-base')

    expect(app_base.find(:xpath, './/..').text).to be_blank
  end
end
