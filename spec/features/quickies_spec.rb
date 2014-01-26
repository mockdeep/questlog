require 'spec_helper'

describe 'Quickies page' do

  let(:user) { create(:free_user) }

  context 'when a user is logged out' do
    it 'associates quickies with a new user' do
      visit '/'
      fill_in 'new_title', with: 'do laundry'
      click_button 'Create Quickie'
      expect(page).to have_content('do laundry')
      click_link 'Sign up'
      fill_in 'Email', with: 'some@email.com'
      fill_in 'Password', with: 'my_password'
      fill_in 'Password confirmation', with: 'my_password'
      click_button 'Create free account!'
      expect(page).to have_content('Log out')
      expect(page).to have_content('do laundry')
      click_link 'Log out'
      expect(page).not_to have_content('do laundry')
    end

    it 'associates quickies with an existing user' do
      visit '/'
      fill_in 'new_title', with: 'do laundry'
      click_button 'Create Quickie'
      expect(page).to have_content('do laundry')
      click_link 'Log in'
      fill_in 'email', with: user.account.email
      fill_in 'password', with: user.account.password
      click_button 'Login'
      expect(page).to have_content('Log out')
      expect(page).to have_content('do laundry')
      click_link 'Log out'
      expect(page).not_to have_content('do laundry')
    end

  end

  it 'allows a guest user to manage quickies' do
    visit '/'
    expect(page).to_not have_button('Done')
    expect(page).to_not have_button('Skip')
    fill_in 'new_title', with: 'do laundry'
    click_button 'Create Quickie'
    expect(page).to have_button('Done')
    expect(page).to have_button('Skip')
    expect(page).to have_content('do laundry')
    within('#new-form') do
      fill_in 'new_title', with: 'feed dog'
    end
    click_button 'Create Quickie'
    expect(page).to have_content('do laundry')
    expect(page).to_not have_content('feed dog')
    click_button 'Skip'
    expect(page).to have_content('feed dog')
    expect(page).to_not have_content('do laundry')
    click_button 'Done'
    expect(page).to have_content('do laundry')
    click_button 'Done'
    expect(page).to_not have_button('Done')
    expect(page).to_not have_button('Skip')
  end

  it 'allows a free user to manage quickies in advanced view' do
    visit '/'
    click_link 'Log in'
    fill_in 'email', with: user.account.email
    fill_in 'password', with: user.account.password
    click_button 'Login'
    click_link 'Switch to advanced view'
    fill_in 'new_title', with: 'do laundry'
    click_button 'Create Quickie'
    expect(page).to have_button('Done')
    expect(page).to have_button('Skip')
    expect(page).to have_content('do laundry')
    expect(Quickie.count).to eq 1
    expect(Quickie.first.repeat_string).to be_nil
  end

end
