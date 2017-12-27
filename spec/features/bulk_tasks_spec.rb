RSpec.describe 'bulk task creation', js: true do

  let(:user) { create(:free_user) }

  before(:each) do
    feature_login_as(user)
  end

  it 'allows the user to upload multiple tasks at the same time' do
    visit '/'
    click_link 'Add multiple tasks'
    titles = "#home *1w do laundry\n#online @10am check mail"
    fill_in 'new-titles', with: titles
    click_button 'Add Tasks'
    expect(current_tasks).to have_task('do laundry')
    expect(current_tasks).to have_no_task('check mail')
    expect(current_tasks).to have_selector(repeat_selector)
    expect(pending_tasks).to have_task('check mail')
    expect(pending_tasks).to have_no_task('do laundry')
    expect(pending_tasks).not_to have_selector(repeat_selector)
  end

end
