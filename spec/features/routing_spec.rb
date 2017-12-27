RSpec.describe 'front end routing', js: true do

  it 'allows the user to navigate forward and backward' do
    visit '/'
    add_task('do laundry')
    click_link 'All my tasks'
    expect(current_tasks).to have_task('do laundry')

    page.go_back

    expect(page).to have_task('do laundry')
  end

end
