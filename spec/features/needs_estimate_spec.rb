RSpec.describe 'needs estimate', js: true do

  it 'shows a "Needs Estimate" button when there are tasks missing estimate' do
    visit '/'
    expect(page).not_to have_content('Needs Estimate')
    add_task('do laundry ~2h')
    expect(page).not_to have_content('Needs Estimate')
    add_task('feed dog')
    expect(page).to have_content('Needs Estimate (1)')
    postpone_button.click
    expect(page).to have_content('feed dog')
    edit_task('feed dog ~5m')
    expect(page).not_to have_content('Needs Estimate')
  end
end
