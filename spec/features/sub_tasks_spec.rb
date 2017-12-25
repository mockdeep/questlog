RSpec.describe 'adding sub tasks', js: true do

  let(:user) { create(:free_user) }

  before { feature_login_as(user) }

  it 'allows adding sub tasks to another task' do
    visit '/'
    add_task('the parent task')
    find('.task-link').click
    expect(page).to have_current_path(task_path(Task.last))
    expect(page).to have_selector("input[value='the parent task']")
    expect(page).to have_no_selector('td')
    add_task('the sub task')
    expect(page).to have_selector('td', text: 'the sub task')
    click_link('the sub task')
    expect(page).to have_selector("input[value='the sub task']")
    expect(page).to have_link('the parent task')
    expect(page).to have_no_selector('td')
    add_task('the sub sub task')
    expect(page).to have_selector('td', text: 'the sub sub task')
    click_link('the parent task')
    expect(page).to have_selector("input[value='the parent task']")
    visit '/'
    expect(page).to have_task_title('the sub sub task')
    click_button 'Done'
    expect(page).to have_task_title('the sub task')
    click_button 'Done'
    expect(page).to have_task_title('the parent task')
    click_button 'Done'
    expect(page).to have_text('No tasks!')
  end

  it 'does not have side effects on adding tasks on other pages' do
    visit '/'
    add_task('the parent task')
    find('.task-link').click
    expect(page).to have_selector("input[value='the parent task']")
    add_task('the sub task')
    expect(page).to have_selector('td', text: 'the sub task')
    page.go_back
    add_task('!1 the not sub task')
    find('.task-link').click
    expect(page).to have_no_link('the parent task')
  end

end
