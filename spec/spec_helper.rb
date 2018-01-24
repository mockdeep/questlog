require 'rubygems'
require 'simplecov'
if ENV['COVERAGE'] != 'false'
  SimpleCov.start 'rails'
  SimpleCov.minimum_coverage 98.25
end

ENV['RAILS_ENV'] ||= 'test'
require File.expand_path('../../config/environment', __FILE__)
Dir[Rails.root.join('spec', 'support', '**', '*.rb')].each { |f| require f }

require 'rspec/rails'
require 'capybara/poltergeist'

chrome_capabilities = Selenium::WebDriver::Remote::Capabilities.chrome(
  chrome_options: { args: %w[--window-size=1200x600 --start-maximized] },
)

Capybara.register_driver :chrome do |app|
  chrome_capabilities = Selenium::WebDriver::Remote::Capabilities.chrome(
    chrome_options: { args: %w[--start-maximized] },
  )
  Capybara::Selenium::Driver.new(
    app,
    browser: :chrome,
    desired_capabilities: chrome_capabilities,
  )
end

Capybara.register_driver :headless_chrome do |app|
  chrome_capabilities = Selenium::WebDriver::Remote::Capabilities.chrome(
    # --start-maximized doesn't seem to work on headless
    chrome_options: { args: %w[headless --window-size=1900x1080] },
  )
  Capybara::Selenium::Driver.new(
    app,
    browser: :chrome,
    desired_capabilities: chrome_capabilities,
  )
end

driver = ENV.fetch('DRIVER', :headless_chrome).to_sym
Capybara.javascript_driver = driver
Capybara.server_port = 8081
Capybara.wait_on_first_by_default = true

ActiveRecord::Migration.maintain_test_schema!

RSpec.configure do |config|
  config.disable_monkey_patching!
  config.render_views
  config.include(FactoryGirl::Syntax::Methods)
  config.include(Questlog::Matchers)
  config.fixture_path = Rails.root.join('spec', 'fixtures')
  config.use_transactional_fixtures = false
  config.infer_spec_type_from_file_location!
  config.raise_errors_for_deprecations!
  config.raise_on_warning = true
  config.infer_base_class_for_anonymous_controllers = false
  config.order = 'random'

  config.filter_run_excluding :slow if ENV['SKIP_SLOW_SPECS']
  config.filter_run focus: true
  config.run_all_when_everything_filtered = true

  config.expect_with :rspec do |expect_config|
    expect_config.syntax = :expect
  end

  config.mock_with :rspec do |mock_config|
    mock_config.verify_doubled_constant_names = true
  end

  VCR.configure do |vcr_config|
    vcr_config.cassette_library_dir = 'spec/fixtures/vcr_cassettes'
    vcr_config.hook_into :webmock
    vcr_config.ignore_hosts 'validator.w3.org'
    vcr_config.ignore_localhost = true
  end

  config.before(:suite) do
    DatabaseCleaner.strategy = :transaction
    DatabaseCleaner.clean_with(:truncation)
  end

  config.before(:each) do
    DatabaseCleaner.start
  end

  config.prepend_before(:each, type: :feature) do
    DatabaseCleaner.strategy = :deletion
    Capybara.reset!
  end

  config.before(:each, type: :feature) do
    visit '/'
  end

  config.after(:each) do
    DatabaseCleaner.clean
  end

  config.append_after(:each, type: :feature) do
    DatabaseCleaner.strategy = :transaction
  end
end

Shoulda::Matchers.configure do |config|
  config.integrate do |with|
    with.test_framework :rspec
    with.library :rails
  end
end

def freeze_time(time = Time.zone.now)
  # round time to get rid of nanosecond discrepancies between ruby time and
  # postgres time
  time = time.round
  Timecop.freeze(time) { yield(time) }
end

def configure_for_threading!
  DatabaseCleaner.clean
  DatabaseCleaner.strategy = :deletion
  DatabaseCleaner.start
end

def threaded(thread_count = 5)
  threads = Array.new(thread_count) do
    Thread.new do
      yield
      ActiveRecord::Base.connection.close
    end
  end
  threads.each(&:join)
end

def login_as(user)
  session[:user_id] = user.id
end

def feature_login_as(user)
  visit '/'
  click_link 'Log in'
  fill_in 'email', with: user.account.email
  fill_in 'password', with: user.account.password
  click_button 'Login'
  expect(page).to have_content("Logged in as #{user.account.email}")
end

def add_task(task_title)
  fill_in 'new-title', with: task_title
  click_button 'Add Task'
  expect(page).to have_content('Task added')
  expect(page).not_to have_content('Task added')
end

def edit_task(new_title)
  task_input = first('.task-input')
  task_input.native.clear
  task_input.set("#{new_title}\n")
end

def select_tag(tag_name)
  within('.tag-buttons') do
    click_link(text: /#{tag_name}/)
  end
end

def repeat_selector
  'i.fa.fa-repeat'
end

def current_tasks
  find('#current-tasks')
end

def pending_tasks
  find('#pending-tasks')
end

def postpone_button
  find('#postpone', text: 'Postpone for:').find('label')
end

def browser
  page.driver.browser
end
