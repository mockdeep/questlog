RSpec.describe 'task tree', js: true do

  let(:user) { create(:free_user) }

  before(:each) do
    task_1 = create(:task, user: user, title: 'parent')
    task_2 = create(:task, user: user, title: 'child', parent_task: task_1)
    create(:task, user: user, title: 'grandchild', parent_task: task_2)
    feature_login_as(user)
    sidebar.click('ALL TASKS')
    click_link('TREE')
  end

  it 'displays tasks in a tree format' do
    parent_item = first('.task-item')
    expect(parent_item).to have_selector('span', text: 'parent')
    within parent_item do
      child_item = first('.task-item')
      expect(child_item).to have_selector('span', text: 'child')

      within child_item do
        grandchild_item = first('.task-item')
        expect(grandchild_item).to have_selector('span', text: 'grandchild')
        expect(grandchild_item).to have_no_selector('.task-item')
      end
    end
  end

  it 'checks off child tasks' do
    expect(page).to have_selector('.task-item', count: 3)
    expect(page).to have_selector('.task-item > span', text: 'grandchild')
    all('.task-item').last.find('label').click
    expect(page).to have_no_selector('.task-item > span', text: 'grandchild')

    expect(page).to have_selector('.task-item > span', text: 'child')
    all('.task-item').last.find('label').click
    expect(page).to have_no_selector('.task-item > span', text: 'child')

    expect(page).to have_selector('.task-item > span', text: 'parent')
    all('.task-item').last.find('label').click
    expect(page).to have_no_selector('.task-item > span', text: 'parent')
    expect(page).to have_no_selector('.task-item')
    sidebar.click('FOCUS')
    expect(page).to have_no_task
  end

  it 'does not allow checking off parent tasks' do
    expect(page).to have_selector('.task-item > span', text: 'parent')
    first('.task-item').first('label').click
    expect(page).to have_selector('.task-item > span', text: 'parent')

    expect(page).to have_selector('.task-item > span', text: 'child')
    all('.task-item')[1].first('label').click
    expect(page).to have_selector('.task-item > span', text: 'child')
  end

end
