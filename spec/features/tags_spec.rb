RSpec.describe 'selecting tags on task display', js: true do

  it 'shows tasks for the selected tag' do
    visit '/'

    add_task('#at-home do laundry #chore !2 *1w ~1h')
    expect(page).to have_content('at-home (1)')
    add_task('#at-work eat a banana')
    expect(page).to have_content('at-work (1)')

    select_tag('at-work')
    expect(page).to have_task_title('eat a banana')
    select_tag('at-home')
    expect(page).to have_task_title('do laundry')

    visit('/at-work')
    expect(page).to have_task_title('eat a banana')
    visit('/at-home')
    expect(page).to have_task_title('do laundry')
  end

  it 'sets tags to active when selected' do
    visit '/'

    add_task('#at-home do laundry #chore !2 *1w ~1h')
    expect(page).to have_no_selector('a.active', text: /at-home/)
    select_tag('at-home')
    expect(page).to have_selector('a.active', text: /at-home/)
  end

  it 'sets tags to current when associated with current task' do
    visit '/'

    add_task('#work get paid !1')
    add_task('#at-home do laundry #chore !2 *1w ~1h')
    expect(page).to have_selector('a.current', text: /work/)
    expect(page).to have_no_selector('a.current', text: /chore/)
    select_tag('at-home')
    expect(page).to have_selector('a.current', text: /chore/)
  end

  it 'shows a smart tag for tasks without tags' do
    visit '/'

    expect(page).to have_no_selector('a', text: /Untagged/)
    add_task('#at-home do laundry #chore *1w ~1h')
    add_task('get paid')
    expect(page).to have_selector('a', text: 'Untagged (1)')
    expect(page).to have_task_title('do laundry')
    select_tag('Untagged')
    expect(page).to have_task_title('get paid')
    edit_task('get paid #work')
    expect(page).to have_no_selector('a', text: /Untagged/)
    expect(page).to have_task_title('(no tasks!)')
  end

  it 'shows a smart tag for tasks missing an estimate' do
    visit '/'

    expect(page).to have_no_selector('a', text: /Needs Estimate/)
    add_task('#at-home do laundry #chore *1w ~1h')
    add_task('get paid')
    expect(page).to have_selector('a', text: 'Needs Estimate (1)')
    expect(page).to have_task_title('do laundry')
    select_tag('Needs Estimate')
    expect(page).to have_task_title('get paid')
    edit_task('get paid ~100h')
    expect(page).to have_no_selector('a', text: /Needs Estimate/)
    expect(page).to have_task_title('(no tasks!)')
  end

end
