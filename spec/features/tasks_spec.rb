require 'spec_helper'

describe 'Tasks page', js: true do

  let(:user) { create(:free_user) }

  def postpone_button
    find('#postpone').find('label')
  end

  context 'when a user is logged out' do
    it 'associates tasks with a new user' do
      visit '/'
      fill_in 'new_title', with: 'do laundry'
      click_button 'Add Task'
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
      click_button 'Add Task'
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

  it 'allows a guest user to manage tasks' do
    visit '/'
    expect(page).to_not have_button('Done')
    expect(page).to_not have_selector('#postpone')
    fill_in 'new_title', with: 'do laundry'
    click_button 'Add Task'
    expect(page).to have_button('Done')
    expect(page).to have_selector('#postpone')
    expect(task_title).to have_content('do laundry')
    within('#new-form') do
      fill_in 'new_title', with: 'feed dog'
    end
    click_button 'Add Task'
    expect(page).to have_content('Task added')
    expect(page).not_to have_content('Task added')
    expect(task_title).to have_content('do laundry')
    expect(task_title).to_not have_content('feed dog')
    postpone_button.click
    expect(task_title).to have_content('feed dog')
    expect(task_title).to_not have_content('do laundry')
    click_button 'Done'
    expect(page).to_not have_selector('#postpone')

    Timecop.travel(1.hour.from_now)

    visit '/'
    expect(task_title).to have_content('do laundry')
    click_button 'Done'
    expect(page).to_not have_button('Done')
    expect(page).to_not have_selector('#postpone')
  end

  it 'allows a free user to manage tasks' do
    feature_login_as(user)
    fill_in 'new_title', with: 'do laundry'
    click_button 'Add Task'
    expect(page).to have_button('Done')
    expect(page).to have_selector('#postpone')
    expect(task_title).to have_content('do laundry')
    expect(Task.count).to eq 1
    expect(Task.first.repeat_string).to be_nil
  end

  it 'allows a user to manage repeat tasks' do
    feature_login_as(user)
    add_task('check email #online *5mi')
    expect(page).to have_content('online (1)')
    expect(task_title.text).to eq 'check email'
    click_button 'Done'
    expect(page).not_to have_selector('#task')

    Timecop.travel(10.minutes.from_now)

    visit '/'
    expect(page).to have_selector('#task')
    expect(task_title.text).to eq 'check email'
  end

  it 'allows a user to edit a task' do
    feature_login_as(user)
    fill_in 'new_title', with: '#at-home do laundry #chore !2 ~1h'
    click_button 'Add Task'
    expect(task_title).to have_content('do laundry')
    expect(page).not_to have_selector(repeat_selector)
    find('#edit-task').click
    fill_in 'edit_title', with: 'do laundry *1w'
    click_button 'Update Task'
    expect(page).to have_selector(repeat_selector)
  end

  it 'parses and adds attributes on tasks' do
    feature_login_as(user)
    fill_in 'new_title', with: '#at-home do laundry #chore !2 *1w ~1h'
    click_button 'Add Task'
    expect(page).to have_content('at-home (1)')
    expect(page).to have_content('chore (1)')
    expect(page).to have_selector(repeat_selector)
    visit '/tasks'
    expect(page).to have_selector(repeat_selector)
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
