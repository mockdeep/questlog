RSpec.describe 'front end routing', js: true do

  it 'allows the user to navigate forward and backward' do
    add_task('do laundry')
    sidebar.click('ALL TASKS')
    expect(current_tasks).to have_task('do laundry')

    page.go_back

    expect(page).to have_task('do laundry')
  end

end
