RSpec.describe 'adding sub tasks', js: true do

  let(:user) { create(:free_user) }

  before { feature_login_as(user) }

  it 'allows adding sub tasks to another task' do
    visit '/'
    add_task('the parent task')
    click_link('the parent task')
    expect(page).to have_current_path(task_path(Task.last))
    expect(page).to have_selector('h2', text: 'the parent task')
    expect(page).to have_no_selector('td')
    add_task('the sub task')
    expect(page).to have_selector('td', text: 'the sub task')
    click_link('the sub task')
    expect(page).to have_selector('h2', text: 'the sub task')
    expect(page).to have_link('the parent task')
    expect(page).to have_no_selector('td')
    add_task('the sub sub task')
    expect(page).to have_selector('td', text: 'the sub sub task')
    click_link('the parent task')
    expect(page).to have_selector('h2', text: 'the parent task')
    visit '/'
    expect(task_title).to have_content('the sub sub task')
    click_button 'Done'
    expect(task_title).to have_content('the sub task')
    click_button 'Done'
    expect(task_title).to have_content('the parent task')
    click_button 'Done'
    expect(task_title).to have_content('(no tasks!)')
  end

end
