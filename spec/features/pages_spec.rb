RSpec.describe 'landing pages', :js do
  it 'lets you view the privacy page' do
    visit '/privacy'
    expect(page).to have_content('We won\'t sell your data')
  end

  it 'lets you view the what page' do
    visit '/what'
    expect(page).to have_content('What\'s a Questlog?')
  end
end
