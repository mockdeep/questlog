require 'spec_helper'

describe 'tasks index page', js: true do

  let(:user) { create(:free_user) }

  before(:each) { feature_login_as(user) }

  it 'allows the user to mark tasks as done' do
    visit '/'
    fill_in 'new_title', with: 'do laundry'
    click_button 'Add Task'
    expect(page).to have_content('Task added')
    expect(page).not_to have_content('Task added')
    click_link 'All my tasks'
    expect(current_tasks).to have_content('do laundry')
    click_link 'Done!'
    expect(page).not_to have_content('do laundry')
  end

  it 'allows the user to delete tasks' do
    visit '/'
    fill_in 'new_title', with: 'do laundry'
    click_button 'Add Task'
    expect(task_title).to have_content('do laundry')
    expect(page).to have_content('Task added')
    expect(page).not_to have_content('Task added')
    click_link 'All my tasks'
    expect(current_tasks).to have_content('do laundry')
    create(:task, user: user, release_at: 1.hour.ago, title: 'feed dog')
    click_link 'Delete'
    expect(current_tasks).not_to have_content('do laundry')
    expect(current_tasks).to have_content('feed dog')
  end

end
