RSpec.describe 'timeframes' do

  def tomorrow
    Timecop.travel(1.day.from_now)
    yield
    Timecop.return
  end

  it 'displays the median productivity of the user', js: true do
    skip
    visit '/'
    add_task('do laundry')
    add_task('feed dog ~5m')
    add_task('reed feeds ~1h')
    add_task('clean dishes')

    tomorrow do
      visit '/timeframes'
      expect(page).to have_text('Median Productivity: 1 hour per day')
    end

    visit '/'
    click_button 'Done'
    tomorrow do
      visit '/timeframes'
      expect(page).to have_text('Median Productivity: 30 minutes per day')
    end

    visit '/'
    click_button 'Done'
    tomorrow do
      visit '/timeframes'
      expect(page).to have_text('Median Productivity: 35 minutes per day')
    end

    visit '/'
    postpone_button.click
    tomorrow do
      visit '/timeframes'
      expect(page).to have_text('Median Productivity: 35 minutes per day')
    end

    visit '/'
    click_button 'Done'
    tomorrow do
      visit '/timeframes'
      expected_text = 'Median Productivity: 1 hour 35 minutes per day'
      expect(page).to have_text(expected_text)
    end
  end

end
