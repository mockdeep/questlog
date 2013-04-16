require 'spec_helper'

describe 'Quickies page' do
  let(:user) { create(:user) }

  before(:each) do
    login_user(user)
  end

  it 'allows a user to manage quickies' do
    page.should_not have_button('Done')
    page.should_not have_button('Skip')
    fill_in 'quickie_title', with: 'do laundry'
    click_button 'Create Quickie'
    page.should have_button('Done')
    page.should have_button('Skip')
    page.should have_content('do laundry')
    fill_in 'quickie_title', with: 'feed dog'
    click_button 'Create Quickie'
    page.should have_content('do laundry')
    page.should_not have_content('feed dog')
    click_button 'Skip'
    page.should have_content('feed dog')
    page.should_not have_content('do laundry')
    click_button 'Done'
    page.should have_content('do laundry')
    click_button 'Done'
    page.should_not have_button('Done')
    page.should_not have_button('Skip')
  end

  it 'allows a user to manage contexts' do
    fill_in 'context_name', with: 'on the toilet'
    click_button 'Add Context'
    fill_in 'context_name', with: 'at work'
    click_button 'Add Context'
    page.should have_content('on the toilet')
    page.should have_content('at work')
    find('.attach-context', text: 'on the toilet').click
    fill_in 'quickie_title', with: 'feed dog'
    click_button 'Create Quickie'
    find('.choose-context', text: 'on the toilet').click
    page.should have_content('feed dog')
    find('.choose-context', text: 'at work').click
    page.should_not have_content('feed dog')
  end
end
