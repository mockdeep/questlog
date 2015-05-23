RSpec.describe 'timeframes', js: true do

  let(:user) { create(:free_user) }

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

  it 'displays the timeframes for the user' do
    feature_login_as(user)

    visit '/timeframes'
    expect(page).not_to have_css('.timeframe')

    task_1 = create(:task, user: user)
    task_2 = create(:task, user: user, estimate_seconds: 360)

    visit '/timeframes'

    expect(page).to have_no_css('.timeframe')
    within('#inbox') do
      expect(find('h2')).to have_text('Inbox 36/?')
      within('li', text: task_1.title) do
        select('This Week', from: 'timeframe-select')
      end

      expect(find('h2')).to have_text('Inbox 6/?')
      within('li', text: task_2.title) do
        select('Today', from: 'timeframe-select')
      end
    end

    expect(page).to have_no_css('#inbox')

    within('.timeframe', text: 'Today') do
      expect(find('h2')).to have_text('Today 6/60')
      expect(find('li')).to have_text(task_2.title)
    end

    within('.timeframe', text: 'This Week') do
      expect(find('h2')).to have_text('This Week 30/0')
      within('li', text: task_1.title) do
        select('Today', from: 'timeframe-select')
      end
    end

    expect(page).to have_no_css('.timeframe', text: 'This Week')

    within('.timeframe', text: 'Today') do
      expect(find('h2')).to have_text('Today 36/60')
      within('li', text: task_1.title) do
        select('-', from: 'timeframe-select')
      end

      expect(find('h2')).to have_text('Today 6/60')
      within('li', text: task_2.title) do
        select('-', from: 'timeframe-select')
      end
    end

    expect(page).to have_no_css('.timeframe')

    within('#inbox') do
      expect(page).to have_content(task_1.title)
      expect(page).to have_content(task_2.title)
    end
  end

end
