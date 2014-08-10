require 'rubygems'
require 'spork'
require 'simplecov'
SimpleCov.start 'rails'

Spork.prefork do
  ENV['RAILS_ENV'] ||= 'test'
  require File.expand_path('../../config/environment', __FILE__)
  Dir[Rails.root.join('spec/support/**/*.rb')].each { |f| require f }

  require 'rspec/rails'
  require 'rspec/autorun'

  require 'capybara/poltergeist'
  Capybara.javascript_driver = :poltergeist

  RSpec.configure do |config|
    config.include(FactoryGirl::Syntax::Methods)
    config.fixture_path = "#{::Rails.root}/spec/fixtures"
    config.use_transactional_fixtures = false
    config.infer_base_class_for_anonymous_controllers = false
    config.order = 'random'

    config.treat_symbols_as_metadata_keys_with_true_values = true
    config.filter_run_excluding :slow if ENV['SKIP_SLOW_SPECS']
    config.filter_run focus: true
    config.run_all_when_everything_filtered = true

    config.expect_with :rspec do |expect_config|
      expect_config.syntax = :expect
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

    config.after(:each) do
      DatabaseCleaner.clean
    end

    config.append_after(:each, type: :feature) do
      DatabaseCleaner.strategy = :transaction
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
    threads = thread_count.times.map do
      Thread.new do
        yield
        ActiveRecord::Base.connection.close
      end
    end
    threads.each(&:join)
  end

end

Spork.each_run do
  FactoryGirl.reload
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
  click_link 'Switch to advanced view'
end

def add_task(task_title)
  fill_in 'new_title', with: task_title
  click_button 'Add Task'
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
