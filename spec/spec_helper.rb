require "rubygems"
require "simplecov"
if ENV["COVERAGE"] != "false"
  SimpleCov.start("rails") do
    enable_coverage :branch
    minimum_coverage 100
  end
end

ENV["RAILS_ENV"] ||= "test"
require File.expand_path("../config/environment", __dir__)

require "rspec/rails"
require "capybara-screenshot/rspec"

def support_path
  Rails.root.join("spec/support")
end
Dir[support_path.join("**/*.rb")].each { |f| require f }

Capybara.server_port = 8081
Capybara.save_path = ENV.fetch("CIRCLE_ARTIFACTS", Capybara.save_path)

[:selenium_chrome, :selenium_chrome_headless].each do |driver_name|
  Capybara::Screenshot.register_driver(driver_name) do |capybara_driver, path|
    capybara_driver.browser.save_screenshot(path)
  end
end

system("pnpm build >/dev/null 2>&1 ", exception: true)
ActiveRecord::Migration.maintain_test_schema!

RSpec.configure do |config|
  config.disable_monkey_patching!
  config.render_views
  config.include(ActiveSupport::Testing::TimeHelpers)
  config.include(FactoryBot::Syntax::Methods)
  config.include(Questlog::Matchers)
  config.include(Questlog::Wrappers)
  config.include(ControllerHelpers, type: :request)
  config.fixture_paths = [Rails.root.join("spec/fixtures")]
  config.use_transactional_fixtures = true
  config.infer_spec_type_from_file_location!
  config.raise_errors_for_deprecations!
  config.raise_on_warning = true
  config.order = "random"

  config.filter_run_excluding :slow if ENV["SKIP_SLOW_SPECS"]
  config.filter_run focus: true
  config.run_all_when_everything_filtered = true

  config.expect_with :rspec do |expect_config|
    expect_config.syntax = :expect
  end

  config.mock_with :rspec do |mock_config|
    mock_config.verify_doubled_constant_names = true
  end

  config.prepend_before(:each, type: :system) do
    Capybara.reset!
    driven_by :selenium, using: :firefox
  end

  config.before(:each, type: :system) do
    visit "/"
    page.execute_script(File.read(support_path.join("disable_animations.js")))
  end
end

Shoulda::Matchers.configure do |config|
  config.integrate do |with|
    with.test_framework :rspec
    with.library :rails
  end
end

def login_as(user)
  user.save! if user.new_record?
  post "/session", params: { session: { email: user.account.email, password: user.account.password } }
end

def system_login_as(user)
  click_link "Log in"
  fill_in "Email", with: user.account.email
  fill_in "Password", with: user.account.password
  click_button "Login"
  expect(page).to have_content("Logged in as #{user.account.email}")
  page.execute_script(File.read(support_path.join("disable_animations.js")))
end

def add_task(task_title)
  fill_in "new-title", with: task_title
  expect(page).to have_field("new-title", with: task_title)
  click_button "Add Task"
  expect(page).to have_content("Task added")
  expect(page).to have_no_field("new-title", with: task_title)
end

def edit_task(new_title)
  within(".task-display") do
    find(".task-input").set(new_title).native.send_key(:enter)
  end
end

def select_tag(tag_name)
  within(".tag-buttons") do
    click_link(text: /#{tag_name}/)
  end
end

def repeat_selector
  "i.fas.fa-redo-alt"
end

def current_tasks
  find("#current-tasks")
end

def pending_tasks
  find("#pending-tasks")
end

def postpone_button
  find("#postpone", text: "Postpone for:").find("label")
end

def browser
  page.driver.browser
end
