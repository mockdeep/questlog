RSpec.describe 'timeframes', js: true do

  def tomorrow
    Timecop.travel(1.day.from_now)
    yield
    Timecop.return
  end

  it 'displays the median productivity of the user' do
    visit '/'
    add_task('do laundry')
    add_task('feed dog ~5m')
    add_task('read feeds ~1h')
    add_task('clean dishes')

    tomorrow do
      visit '/timeframes'
      expect(page).to have_text('Median Productivity: 1 hour per day')
    end

    visit '/'
    click_button 'Done'
    expect(task_title).to have_content('feed dog')
    tomorrow do
      visit '/timeframes'
      expect(page).to have_text('Median Productivity: 30 minutes per day')
    end

    visit '/'
    click_button 'Done'
    expect(task_title).to have_content('read feeds')
    tomorrow do
      visit '/timeframes'
      expect(page).to have_text('Median Productivity: 35 minutes per day')
    end

    visit '/'
    postpone_button.click
    expect(task_title).to have_content('clean dishes')
    tomorrow do
      visit '/timeframes'
      expect(page).to have_text('Median Productivity: 35 minutes per day')
    end

    visit '/'
    click_button 'Done'
    expect(task_title).to have_content('read feeds')
    tomorrow do
      visit '/timeframes'
      expected_text = 'Median Productivity: 1 hour, 5 minutes per day'
      expect(page).to have_text(expected_text)
    end
  end

end
