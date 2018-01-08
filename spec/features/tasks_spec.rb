RSpec.describe 'Tasks page', js: true do

  let(:user) { create(:free_user) }

  before { visit '/' }

  context 'when a user is logged out' do
    it 'associates tasks with a new user' do
      add_task('do laundry')
      expect(page).to have_task('do laundry')
      click_link 'Sign up'
      fill_in 'Email', with: 'some@email.com'
      fill_in 'Password', with: 'my_password'
      fill_in 'Password confirmation', with: 'my_password'
      click_button 'Create free account!'
      expect(page).to have_content('Log out')
      expect(page).to have_task('do laundry')
      click_link 'Log out'
      expect(page).to have_no_task
    end

    it 'associates tasks with an existing user' do
      add_task('do laundry')
      expect(page).to have_task('do laundry')
      click_link 'Log in'
      fill_in 'email', with: user.account.email
      fill_in 'password', with: user.account.password
      click_button 'Login'
      expect(page).to have_content('Log out')
      expect(page).to have_task('do laundry')
      click_link 'Log out'
      expect(page).to have_no_task
    end
  end

  it 'allows a guest user to manage tasks' do
    expect(page).not_to have_button('Done')
    expect(page).to have_no_task
    add_task('do laundry #home')
    expect(page).to have_button('Done')
    expect(page).to have_selector('#postpone')
    expect(page).to have_task('do laundry')
    add_task('feed dog')
    expect(page).to have_task('do laundry')
    expect(page).to have_no_task('feed dog')
    postpone_button.click
    expect(page).to have_task('feed dog')
    expect(page).to have_no_task('do laundry')
    click_button 'Done'
    expect(page).to have_no_task

    Timecop.travel(1.hour.from_now)

    visit '/'
    expect(page).to have_task('do laundry')
    expect(page).to have_tag('home (1)')
    click_button 'Done'
    expect(page).to have_no_task
  end

  it 'allows a free user to manage tasks' do
    add_task('do laundry #home')
    expect(page).to have_button('Done')
    expect(page).to have_selector('#postpone')
    expect(page).to have_text('home (1)')
    expect(page).to have_task('do laundry')
    expect(Task.count).to eq 1
    expect(Task.first.repeat_string).to be_nil
  end

  it 'allows a user to manage repeat tasks' do
    add_task('check email #online *5mi')
    expect(page).to have_tag('online (1)')
    expect(page).to have_task('check email')
    click_button 'Done'
    expect(page).to have_no_task

    Timecop.travel(10.minutes.from_now)

    visit '/'
    expect(page).to have_selector('#task')
    expect(page).to have_task('check email')
  end

  it 'allows a user to edit a task' do
    add_task('#at-home do laundry !2 ~1h')
    expect(page).to have_task('do laundry')
    expect(page).not_to have_selector(repeat_selector)
    edit_task('do lots of laundry *1w #chore')
    expect(page).to have_task('do lots of laundry')
    expect(page).to have_selector(repeat_selector)
  end

  it 'allows a user to delete a task' do
    add_task('do laundry #home')
    expect(page).to have_task('do laundry')
    expect(page).to have_tag('home (1)')
    add_task('feed dog #home')
    expect(page).to have_tag('home (2)')
    expect(page).to have_task('do laundry')
    accept_confirm { find('.delete-button').click }
    expect(page).to have_task('feed dog')
    expect(page).to have_tag('home (1)')
  end

  it 'parses and adds attributes on tasks' do
    add_task('#at-home do laundry #chore !2 *1w ~1h')
    expect(page).to have_tag('at-home (1)')
    expect(page).to have_tag('chore (1)')
    expect(page).to have_selector(repeat_selector)
    visit '/tasks'
    expect(page).to have_selector(repeat_selector)
    task = Task.first
    expect(task.title).to eq 'do laundry'
    expect(task.tags.pluck(:name).sort).to eq %w[at-home chore]
    expect(task.priority).to eq 2
    expect(task.repeat_seconds).to eq 1.week
    # expect(task.repeat_string).to eq 'every week'
    expect(task.estimate_seconds).to eq 1.hour
    # expect(task.estimate_string).to eq '1 hour'
    # expect(task.release_at).to eq Time.parse(time)
  end

  it 'shows a help modal' do
    first(:button, 'Help').click
    expect(page).to have_content('You can type different markers')
  end

end
