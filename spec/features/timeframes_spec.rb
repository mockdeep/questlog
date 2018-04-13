RSpec.describe 'timeframes', js: true do

  let(:user) { create(:free_user) }

  def tomorrow
    Timecop.travel(1.day.from_now)
    yield
    Timecop.return
  end

  it 'displays the median productivity of the user' do
    add_task('do laundry')
    add_task('feed dog ~5m')
    add_task('read feeds ~1h')
    add_task('clean dishes')

    tomorrow do
      sidebar.click('TIMEFRAMES')
      expect(page).to have_text('Median Productivity: 1 hour per day')
    end

    sidebar.click('FOCUS')
    expect(page).to have_task('do laundry')
    click_button 'Done'
    expect(page).to have_task('feed dog')
    tomorrow do
      sidebar.click('TIMEFRAMES')
      expect(page).to have_text('Median Productivity: 30 minutes per day')
    end

    sidebar.click('FOCUS')
    expect(page).to have_task('feed dog')
    click_button 'Done'
    expect(page).to have_task('read feeds')
    tomorrow do
      sidebar.click('TIMEFRAMES')
      expect(page).to have_text('Median Productivity: 35 minutes per day')
    end

    sidebar.click('FOCUS')
    expect(page).to have_task('read feeds')
    postpone_button.click
    expect(page).to have_task('clean dishes')
    tomorrow do
      sidebar.click('TIMEFRAMES')
      expect(page).to have_text('Median Productivity: 35 minutes per day')
    end

    click_link('Refresh')

    sidebar.click('FOCUS')
    expect(page).to have_task('clean dishes')
    click_button 'Done'
    expect(page).to have_task('read feeds')
    tomorrow do
      sidebar.click('TIMEFRAMES')
      expected_text = 'Median Productivity: 1 hour, 5 minutes per day'
      expect(page).to have_text(expected_text)
    end

    sidebar.click('FOCUS')

    expect(page).to have_tag('Untagged (1)')
  end

  it 'displays the timeframes for the user' do
    feature_login_as(user)

    expect(page).to have_no_task

    Timecop.travel(Time.zone.parse('2014/04/16'))
    milliseconds = Time.zone.now.to_i * 1000
    page.execute_script("window.balanceTime = #{milliseconds}")

    create(:stat, user: user, timestamp: 3.days.ago, value: 3600)
    create(:stat, user: user, timestamp: 4.days.ago, value: 4000)

    sidebar.click('TIMEFRAMES')

    expect(page).to have_content('Median Productivity')

    task_1 = create(:task, user: user)
    task_2 = create(:task, user: user, estimate_seconds: 365)

    click_link('Refresh')

    expect(page).to have_no_css('.timeframe')
    within('.inbox#inbox') do
      expect(find('h2', text: /\AInbox 36\/∞\z/)).to be_truthy
      task_row(task_1.title).select('This Week', from: 'timeframe-select')

      expect(find('h2', text: /\AInbox 6\/∞\z/)).to be_truthy
      task_row(task_2.title).select('Today', from: 'timeframe-select')
    end

    expect(page).to have_no_css('#inbox')

    within('.timeframe#today') do
      expect(find('h2', text: /\AToday 6\/63\z/)).to be_truthy
      expect(find('tbody > tr .task-input').value).to eq(task_2.title)
    end

    within('.timeframe#week') do
      expect(find('h2', text: /\AThis Week 30\/95\z/)).to be_truthy
      task_row(task_1.title).select('Today', from: 'timeframe-select')
    end

    expect(page).to have_no_css('.timeframe#week')

    within('.timeframe#today') do
      expect(find('h2', text: /\AToday 36\/63\z/)).to be_truthy
      task_row(task_1.title).select('-', from: 'timeframe-select')

      expect(find('h2', text: /\AToday 6\/63\z/)).to be_truthy
      task_row(task_2.title).select('-', from: 'timeframe-select')
    end

    expect(page).to have_no_css('.timeframe')

    within('.inbox#inbox') do
      expect(all('.task-input').map(&:value)).to eq [task_1.title, task_2.title]
    end

    visit '/'

    expect(page).to have_tag('Needs Estimate (1)')
  end

end
