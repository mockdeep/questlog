RSpec.describe 'tag counters', js: true do

  let(:user) { create(:free_user) }

  before do
    create(:tag, user: user, name: 'existing-tag')
    feature_login_as(user)
  end

  it 'updates when a task is created with a new tag' do
    expect(page).to have_no_task

    add_task('task with #new-tag')

    expect(page).to have_no_tag('existing-tag')
    expect(page).to have_tag('new-tag (1)')
  end

  it 'updates when a task is created with an existing tag' do
    expect(page).to have_no_task

    add_task('task with #existing-tag')
    expect(page).to have_tag('existing-tag (1)')

    add_task('another task with #existing-tag')
    expect(page).to have_tag('existing-tag (2)')
  end

  it 'updates when a task is deleted' do
    expect(page).to have_no_task

    add_task('task with #existing-tag')
    add_task('another task with #existing-tag')
    expect(page).to have_tag('existing-tag (2)')

    accept_confirm { find('.delete-button').click }
    expect(page).to have_tag('existing-tag (1)')

    accept_confirm { find('.delete-button').click }
    expect(page).to have_no_tag('existing-tag')
  end

  it 'updates when a task is updated to a new tag' do
    expect(page).to have_no_task

    add_task('task with #existing-tag')
    expect(page).to have_tag('existing-tag (1)')

    edit_task('task with #new-tag')
    expect(page).to have_no_tag('existing-tag')
    expect(page).to have_tag('new-tag (1)')
  end

  it 'updates when a task is updated to an existing tag' do
    expect(page).to have_no_task

    add_task('task with #new-tag')
    expect(page).to have_tag('new-tag (1)')

    edit_task('task with #existing-tag')
    expect(page).to have_no_tag('new-tag')
    expect(page).to have_tag('existing-tag (1)')
  end

  it 'updates when a task is marked done' do
    expect(page).to have_no_task

    add_task('task with #existing-tag')
    add_task('another task with #existing-tag')
    expect(page).to have_tag('existing-tag (2)')

    click_button 'Done'
    expect(page).to have_tag('existing-tag (1)')

    click_button 'Done'
    expect(page).to have_no_tag('existing-tag')
  end

  it 'updates when a task is postponed' do
    expect(page).to have_no_task

    add_task('task with #existing-tag')
    add_task('another task with #existing-tag')
    expect(page).to have_tag('existing-tag (2)')

    postpone_button.click
    expect(page).to have_tag('existing-tag (1)')

    postpone_button.click
    expect(page).to have_no_tag('existing-tag')
  end

  it 'updates when a sub-task is added to the same tag' do
    expect(page).to have_no_task

    add_task('task with #existing-tag')
    expect(page).to have_tag('existing-tag (1)')

    find('.task-link').click
    expect(page).to have_current_path(task_path(Task.last))

    add_task('the sub task #existing-tag')
    page.go_back
    expect(page).to have_tag('existing-tag (1)')

    click_button 'Done'
    expect(page).to have_tag('existing-tag (1)')

    click_button 'Done'
    expect(page).to have_no_tag('existing-tag')
  end

  it 'updates when a sub-task is added to a different tag' do
    expect(page).to have_no_task

    add_task('task with #existing-tag')
    expect(page).to have_tag('existing-tag (1)')

    find('.task-link').click
    expect(page).to have_current_path(task_path(Task.last))

    add_task('the sub task #new-tag')
    page.go_back
    expect(page).to have_no_tag('existing-tag')
    expect(page).to have_tag('new-tag (1)')

    click_button 'Done'
    expect(page).to have_no_tag('new-tag')
    expect(page).to have_tag('existing-tag (1)')

    click_button 'Done'
    expect(page).to have_no_tag('existing-tag')
  end

end
