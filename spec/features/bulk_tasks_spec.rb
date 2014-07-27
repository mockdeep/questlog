require 'spec_helper'

describe 'bulk task creation' do

  let(:user) { create(:free_user) }

  before(:each) do
    feature_login_as(user)
  end

  def current_tasks
    find('#current-tasks')
  end

  def pending_tasks
    find('#pending-tasks')
  end

  it 'allows the user to upload multiple tasks at the same time' do
    visit '/'
    click_link 'Add multiple tasks'
    titles = "#home *1w do laundry\n#online @10am check mail"
    fill_in 'bulk_task_titles', with: titles
    click_button 'Add Tasks'
    expect(current_tasks).to have_content('do laundry')
    expect(current_tasks).not_to have_content('check mail')
    expect(current_tasks).to have_selector(repeat_selector)
    expect(pending_tasks).to have_content('check mail')
    expect(pending_tasks).not_to have_content('do laundry')
    expect(pending_tasks).not_to have_selector(repeat_selector)
  end

end
