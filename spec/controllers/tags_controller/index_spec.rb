RSpec.describe TagsController, '#index' do
  it 'renders tags for the current user, ordered by name' do
    user = create(:user)
    login_as(user)
    create(:tag, user: user, name: 'At home')

    get(:index)

    expect(rendered.find('.tag-row')).to have_content('At home')
  end
end
