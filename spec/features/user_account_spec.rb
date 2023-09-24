RSpec.describe 'user accounts', :js do
  let(:user) { create(:free_user) }

  it 'allows a user sign up for an account' do
    expect(page).to have_content('You\'re not logged in!')
    click_link('Sign up')
    fill_in 'Email', with: 'some@email.com'
    fill_in 'Password', with: 'my_password'
    fill_in 'Password confirmation', with: 'my_password'
    click_button 'Create free account!'
    expect(page).to have_content('Log out')
    expect(page).to have_content('Logged in as some@email.com')
  end

  it 'allows an existing user to log in' do
    click_link('Log in')
    fill_in 'Email', with: user.account.email
    fill_in 'Password', with: user.account.password
    click_button('Login')
    expect(page).to have_content("Logged in as #{user.email}")
    expect(page).to have_content('Logged in!')
  end
end
