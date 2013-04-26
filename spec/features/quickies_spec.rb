require 'spec_helper'

describe 'Quickies page' do
  let(:user) { create(:user) }

  before(:each) do
    login_user(user)
  end

  it 'allows a user to manage quickies' do
    page.should_not have_button('Done')
    page.should_not have_button('Skip')
    fill_in 'new_title', with: 'do laundry'
    click_button 'Create Quickie'
    page.should have_button('Done')
    page.should have_button('Skip')
    page.should have_content('do laundry')
    within('#new-form') do
      fill_in 'new_title', with: 'feed dog'
    end
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

  it 'allows a user to manage contexts', js: true do
    fill_in 'context_name', with: 'on the toilet'
    click_button 'Add Context'
    fill_in 'context_name', with: 'at work'
    click_button 'Add Context'

    page.should have_content('on the toilet (0)')
    page.should have_content('at work (0)')

    find('.attach-context', text: 'on the toilet').click
    fill_in 'new_title', with: 'feed dog'
    click_button 'Create Quickie'
    page.should have_content('All (1)')
    page.should have_content('on the toilet (1)')
    page.should have_content('at work (0)')

    find('.choose-context', text: 'on the toilet').click
    page.should have_content('feed dog')
    within('#new-form') do
      find('.attach-context', text: 'on the toilet').click
      fill_in 'new_title', with: 'feed cat'
      click_button 'Create Quickie'
    end

    page.should have_content('All (2)')
    page.should have_content('on the toilet (2)')
    page.should have_content('at work (0)')
    find('.choose-context', text: 'at work').click
    page.should_not have_content('feed dog')
  end

end
