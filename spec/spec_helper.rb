require 'rubygems'
require 'spork'

Spork.prefork do
  ENV["RAILS_ENV"] ||= 'test'
  require File.expand_path("../../config/environment", __FILE__)
  Dir[Rails.root.join("spec/support/**/*.rb")].each {|f| require f}

  require 'rspec/rails'
  require 'rspec/autorun'

  Capybara.javascript_driver = :webkit

  RSpec.configure do |config|
    config.include(FactoryGirl::Syntax::Methods)
    config.fixture_path = "#{::Rails.root}/spec/fixtures"
    config.use_transactional_fixtures = false
    config.infer_base_class_for_anonymous_controllers = false
    config.order = "random"

    config.treat_symbols_as_metadata_keys_with_true_values = true
    config.filter_run_excluding :slow if ENV['SKIP_SLOW_SPECS']
    config.filter_run focus: true
    config.run_all_when_everything_filtered = true

    VCR.configure do |config|
      config.cassette_library_dir = 'spec/fixtures/vcr_cassettes'
      config.hook_into :webmock
      config.ignore_hosts 'validator.w3.org'
      config.ignore_localhost = true
    end

    config.before(:suite) do
      DatabaseCleaner.strategy = :transaction
      DatabaseCleaner.clean_with(:truncation)
    end

    config.before(:suite, js: true) do
      DatabaseCleaner.strategy = :deletion
      DatabaseCleaner.clean_with(:truncation)
    end

    config.before(:each) do
      DatabaseCleaner.start
      DeferredGarbageCollection.start
    end

    config.after(:each) do
      DeferredGarbageCollection.reconsider
      DatabaseCleaner.clean
    end
  end

end

Spork.each_run do
  FactoryGirl.reload
end

def login_as(user)
  session[:user_id] = user.id
end

def login_user(user)
  visit '/'
  fill_in 'email', with: user.email
  fill_in 'password', with: user.password
  click_button 'Login'
end
