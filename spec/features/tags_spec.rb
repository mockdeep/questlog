RSpec.describe 'selecting tags on task display', js: true do

  it 'shows tasks for the selected tag' do
    visit '/'

    add_task('#at-home do laundry #chore !2 *1w ~1h')
    expect(page).to have_content('at-home (1)')
    add_task('#at-work eat a banana')
    expect(page).to have_content('at-work (1)')

    select_tag('at-work')
    expect(task_title).to have_content('eat a banana')
    select_tag('at-home')
    expect(task_title).to have_content('do laundry')
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

end
