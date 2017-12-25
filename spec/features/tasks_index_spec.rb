RSpec.describe 'tasks index page', js: true do

  let(:user) { create(:free_user) }

  before(:each) { feature_login_as(user) }

  it 'allows the user to mark tasks as done' do
    visit '/'
    add_task('do laundry')
    click_link 'All my tasks'
    expect(current_tasks).to have_content('do laundry')
    click_button 'DONE'
    expect(page).not_to have_content('do laundry')
  end

  it 'allows the user to delete tasks' do
    visit '/'
    fill_in 'new-title', with: 'do laundry'
    click_button 'Add Task'
    expect(page).to have_task('do laundry')
    click_link 'All my tasks'
    expect(current_tasks).to have_content('do laundry')
    create(:task, user: user, release_at: 1.hour.ago, title: 'feed dog')
    accept_confirm { click_button 'DELETE' }
    expect(current_tasks).not_to have_content('do laundry')
    expect(current_tasks).to have_content('feed dog')
  end

  it 'highlights priority tasks as red' do
    visit '/'
    add_task('do laundry')
    expect(page.find('#task')['class']).not_to include('priority-1')
    add_task('feed dog !1 #home')
    expect(page.find('#task')['class']).to include('priority-1')
    within('.tag-buttons') do
      button = find('.button', text: 'home')
      expect(button['class']).to include('priority-1')
    end
    add_task('eat breakfast !2 #home')
    add_task('go to work !3 #errand')
    within('.tag-buttons') do
      button = find('.button', text: 'home')
      expect(button['class']).to include('priority-1')
      expect(button['class']).not_to include('priority-2')
      button = find('.button', text: 'errand')
      expect(button['class']).to include('priority-3')
    end
    expect(page.find('#task')['class']).to include('priority-1')
    click_button('Done')
    expect(page).to have_task('eat breakfast')
    within('.tag-buttons') do
      button = find('.button', text: 'home')
      expect(button['class']).to include('priority-2')
      expect(button['class']).not_to include('priority-1')
    end
    expect(page).to have_task('eat breakfast')
    expect(page.find('#task')['class']).not_to include('priority-1')
    expect(page.find('#task')['class']).to include('priority-2')
    click_button('Done')
    expect(page).to have_task('go to work')
    expect(page.find('#task')['class']).to include('priority-3')
  end

  it 'allows a user to undo a task' do
    task = create(
      :task,
      user: user,
      done_at: Time.zone.now,
      release_at: 1.week.from_now,
    )
    visit('/tasks')
    expect(pending_tasks).to have_content(task.title)
    within('tr', text: task.title) { click_button('UNDO') }
    expect(page).to have_no_selector('#pending-tasks')
    expect(current_tasks).to have_content(task.title)
  end

end
