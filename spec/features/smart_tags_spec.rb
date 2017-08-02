RSpec.describe 'editing smart tags', js: true do

  let(:user) { create(:free_user) }

  it 'allows selecting rules from dropdowns' do
    feature_login_as(user)
    tag = create(:tag, name: 'my tag', user: user)
    visit '/tags'

    expect(page).to have_selector('.tag-row', count: 3)
    within('.tag-row', text: tag.name) { click_link('Edit') }

    expect(page).to have_content("Editing tag #{tag.name}")
    expect(page).to have_no_selector('li')
    click_button('Add Rule')
    expect(page).to have_selector('li', count: 1)
    click_button('Save Tag')

    within('.tag-row', text: tag.name) { click_link('Edit') }
    expect(page).to have_selector('li', count: 1)
    within('li') do
      fields, checks = find_all('select').to_a
      expect(fields.value).to eq 'estimateSeconds'
      expect(checks.value).to eq 'isBlank'

      fields.find(:option, text: 'Tags').select_option
      checks = find_all('select').last
      expect(checks.value).to eq 'isEmpty'
    end

    click_button('Add Rule')
    click_button('Add Rule')
    click_button('Add Rule')

    expect(page).to have_selector('li', count: 4)

    dismiss_confirm { click_button('Save Tag') }
    accept_confirm { click_button('Save Tag') }

    within('.tag-row', text: tag.name) { click_link('Edit') }

    expect(page).to have_selector('li', count: 2)

    # visit '/'

    # expect(page).to have_no_selector('a', text: tag.name)
    # add_task('some random task')
    # expect(page).to have_selector('a', text: tag.name)
  end

end
