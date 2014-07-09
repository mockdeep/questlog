require 'spec_helper'

describe 'Tasks page' do

  let(:user) { create(:free_user) }

  context 'when a user is logged out' do
    it 'associates tasks with a new user' do
      visit '/'
      fill_in 'new_title', with: 'do laundry'
      click_button 'Create Task'
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

    it 'associates tasks with an existing user' do
      visit '/'
      fill_in 'new_title', with: 'do laundry'
      click_button 'Create Task'
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

  it 'allows a guest user to manage tasks' do
    visit '/'
    expect(page).to_not have_button('Done')
    expect(page).to_not have_button('Skip')
    fill_in 'new_title', with: 'do laundry'
    click_button 'Create Task'
    expect(page).to have_button('Done')
    expect(page).to have_button('Skip')
    expect(page).to have_content('do laundry')
    within('#new-form') do
      fill_in 'new_title', with: 'feed dog'
    end
    click_button 'Create Task'
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
    expect(page).to have_button('Skip')
    expect(page).to have_content('do laundry')
    expect(Task.count).to eq 1
    expect(Task.first.repeat_string).to be_nil
  end

  it 'parses and adds attributes on tasks' do
    visit '/'
    time = 1.day.from_now.beginning_of_day.strftime('%I:%M%P')
    fill_in 'new_title', with: "#at-home do laundry #chore !2 *1w ~1h ^#{time}"
    click_button 'Create Task'
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
