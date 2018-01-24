RSpec.describe 'selecting tags on task display', js: true do

  it 'shows tasks for the selected tag' do
    add_task('#at-home do laundry #chore !2 *1w ~1h')
    expect(page).to have_tag('at-home (1)')
    add_task('#at-work eat a banana')
    expect(page).to have_tag('at-work (1)')

    select_tag('at-work')
    expect(page).to have_task('eat a banana')
    select_tag('at-home')
    expect(page).to have_task('do laundry')

    visit('/at-work')
    expect(page).to have_task('eat a banana')
    visit('/at-home')
    expect(page).to have_task('do laundry')
  end

  it 'sets tags to active when selected' do
    add_task('#at-home do laundry #chore !2 *1w ~1h')
    expect(page).to have_no_selector('a.active', text: /at-home/)
    select_tag('at-home')
    expect(page).to have_selector('a.active', text: /at-home/)
  end

  it 'sets tags to current when associated with current task' do
    add_task('#work get paid !1')
    add_task('#at-home do laundry #chore !2 *1w ~1h')
    expect(page).to have_selector('a.current', text: /work/)
    expect(page).to have_no_selector('a.current', text: /chore/)
    select_tag('at-home')
    expect(page).to have_selector('a.current', text: /chore/)
  end

  it 'shows a smart tag for tasks without tags' do
    expect(page).to have_no_tag('Untagged')
    add_task('#at-home do laundry #chore *1w ~1h')
    add_task('get paid')
    expect(page).to have_tag('Untagged (1)')
    expect(page).to have_task('do laundry')
    select_tag('Untagged')
    expect(page).to have_task('get paid')
    edit_task('get paid #work')
    expect(page).to have_no_tag('Untagged')
    expect(page).to have_no_task
  end

  it 'shows a smart tag for tasks missing an estimate' do
    expect(page).to have_no_tag('Needs Estimate')
    add_task('#at-home do laundry #chore *1w ~1h')
    add_task('get paid')
    expect(page).to have_tag('Needs Estimate (1)')
    expect(page).to have_task('do laundry')
    select_tag('Needs Estimate')
    expect(page).to have_task('get paid')
    edit_task('get paid ~100h')
    expect(page).to have_no_tag('Untagged')
    expect(page).to have_no_task
  end

end
