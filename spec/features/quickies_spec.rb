require 'spec_helper'

describe 'Quickies page' do
  let(:user) { create(:user, mode: 'advanced') }

  before(:each) do
    login_user(user)
  end

  it 'allows a user to manage quickies' do
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

  it 'allows a user to manage contexts', js: true do
    fill_in 'context_name', with: 'on the toilet'
    click_button 'Add Context'
    fill_in 'context_name', with: 'at work'
    click_button 'Add Context'

    expect(page).to have_content('on the toilet (0)')
    expect(page).to have_content('at work (0)')

    find('.attach-context', text: 'on the toilet').click
    fill_in 'new_title', with: 'feed dog'
    click_button 'Create Quickie'
    expect(page).to have_content('All (1)')
    expect(page).to have_content('on the toilet (1)')
    expect(page).to have_content('at work (0)')

    find('.choose-context', text: 'on the toilet').click
    expect(page).to have_content('feed dog')
    within('#new-form') do
      find('.attach-context', text: 'on the toilet').click
      fill_in 'new_title', with: 'feed cat'
      click_button 'Create Quickie'
    end

    expect(page).to have_content('All (2)')
    expect(page).to have_content('on the toilet (2)')
    expect(page).to have_content('at work (0)')
    find('.choose-context', text: 'at work').click
    expect(page).to_not have_content('feed dog')

    find('.choose-context', text: 'on the toilet').click
    expect(page).to have_content('feed dog')

    page.evaluate_script('window.confirm = function() { return true; }')
    find('#delete-quickie').click
    expect(page).to_not have_content('feed dog')
    expect(page).to have_content('All (1)')
    expect(page).to have_content('on the toilet (1)')
    expect(page).to have_content('at work (0)')
  end

end
