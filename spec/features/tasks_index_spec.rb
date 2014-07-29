require 'spec_helper'

describe 'tasks index page' do

  let(:user) { create(:free_user) }

  before(:each) { feature_login_as(user) }

  it 'allows the user to mark tasks as done' do
    visit '/'
    fill_in 'new_title', with: 'do laundry'
    click_button 'Add Task'
    click_link 'All my tasks'
    expect(current_tasks).to have_content('do laundry')
    click_link 'Done!'
    expect(page).not_to have_content('do laundry')
  end

end
