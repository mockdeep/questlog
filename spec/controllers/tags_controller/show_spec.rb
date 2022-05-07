RSpec.describe TagsController, '#show' do
  it 'renders the react layout' do
    tag = create(:tag)
    login_as(tag.user)

    get(:show, params: { id: tag.slug })

    expect(rendered).to have_selector('#app-base')
  end
end
