RSpec.describe 'needs estimate', :js do
  it 'shows a "Needs Estimate" button when there are tasks missing estimate' do
    expect(page).to have_no_tag('Needs Estimate')
    add_task('do laundry ~2h')
    expect(page).to have_no_tag('Needs Estimate')
    add_task('feed dog')
    expect(page).to have_tag('Needs Estimate (1)')
    postpone_button.click
    expect(page).to have_task('feed dog')
    edit_task('feed dog ~5m')
    expect(page).to have_no_tag('Needs Estimate')
  end
end
