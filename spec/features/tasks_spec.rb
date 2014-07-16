require 'spec_helper'

describe 'Tasks page' do

  let(:user) { create(:free_user) }

  def task_title
    find('#task').find('.title')
  end

  def postpone_button
    find('#postpone').find('label')
  end

  context 'when a user is logged out' do
    it 'associates tasks with a new user' do
      visit '/'
      fill_in 'new_title', with: 'do laundry'
      click_button 'Create Task'
      expect(task_title).to have_content('do laundry')
      click_link 'Sign up'
      fill_in 'Email', with: 'some@email.com'
      fill_in 'Password', with: 'my_password'
      fill_in 'Password confirmation', with: 'my_password'
      click_button 'Create free account!'
      expect(page).to have_content('Log out')
      expect(page).to have_content('do laundry')
      click_link 'Log out'
      expect(page).not_to have_selector('#task')
    end

    it 'associates tasks with an existing user' do
      visit '/'
      fill_in 'new_title', with: 'do laundry'
      click_button 'Create Task'
      expect(task_title).to have_content('do laundry')
      click_link 'Log in'
      fill_in 'email', with: user.account.email
      fill_in 'password', with: user.account.password
      click_button 'Login'
      expect(page).to have_content('Log out')
      expect(task_title).to have_content('do laundry')
      click_link 'Log out'
      expect(page).not_to have_selector('#task')
    end
  end

  it 'allows a guest user to manage tasks', js: true do
    visit '/'
    expect(page).to_not have_button('Done')
    expect(page).to_not have_selector('#postpone')
    fill_in 'new_title', with: 'do laundry'
    click_button 'Create Task'
    expect(page).to have_button('Done')
    expect(page).to have_selector('#postpone')
    expect(task_title).to have_content('do laundry')
    within('#new-form') do
      fill_in 'new_title', with: 'feed dog'
    end
    click_button 'Create Task'
    expect(task_title).to have_content('do laundry')
    expect(task_title).to_not have_content('feed dog')
    postpone_button.click
    expect(task_title).to have_content('feed dog')
    expect(task_title).to_not have_content('do laundry')
    click_button 'Done'
    expect(page).to_not have_selector('#postpone')

    freeze_time(1.hour.from_now) do
      visit '/'
      expect(task_title).to have_content('do laundry')
      click_button 'Done'
      expect(page).to_not have_button('Done')
      expect(page).to_not have_selector('#postpone')
    end
  end

  it 'allows a free user to manage tasks in advanced view' do
    visit '/'
    click_link 'Log in'
    fill_in 'email', with: user.account.email
    fill_in 'password', with: user.account.password
    click_button 'Login'
    click_link 'Switch to advanced view'
    fill_in 'new_title', with: 'do laundry'
    click_button 'Create Task'
    expect(page).to have_button('Done')
    expect(page).to have_selector('#postpone')
    expect(task_title).to have_content('do laundry')
    expect(Task.count).to eq 1
    expect(Task.first.repeat_string).to be_nil
  end

  it 'parses and adds attributes on tasks' do
    visit '/'
    click_link 'Log in'
    fill_in 'email', with: user.account.email
    fill_in 'password', with: user.account.password
    click_button 'Login'
    click_link 'Switch to advanced view'
    fill_in 'new_title', with: '#at-home do laundry #chore !2 *1w ~1h'
    click_button 'Create Task'
    expect(page).to have_content('at-home (1)')
    expect(page).to have_content('chore (1)')
    expect(page).to have_selector('i.fa.fa-repeat')
    visit '/tasks'
    expect(page).to have_selector('i.fa.fa-repeat')
    task = Task.first
    expect(task.title).to eq 'do laundry'
    expect(task.contexts.pluck(:name).sort).to eq %w(at-home chore)
    expect(task.priority).to eq 2
    expect(task.repeat_seconds).to eq 1.week
    # expect(task.repeat_string).to eq 'every week'
    expect(task.estimate_seconds).to eq 1.hour
    # expect(task.estimate_string).to eq '1 hour'
    # expect(task.release_at).to eq Time.parse(time)
  end

end
