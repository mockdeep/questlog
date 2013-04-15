require 'rubygems'
require 'spork'

Spork.prefork do
  ENV["RAILS_ENV"] ||= 'test'
  require File.expand_path("../../config/environment", __FILE__)
  Dir[Rails.root.join("spec/support/**/*.rb")].each {|f| require f}

  require 'rspec/rails'
  require 'rspec/autorun'

  RSpec.configure do |config|
    config.include(FactoryGirl::Syntax::Methods)
    config.fixture_path = "#{::Rails.root}/spec/fixtures"
    config.use_transactional_fixtures = true
    config.infer_base_class_for_anonymous_controllers = false
    config.order = "random"
  end
end

Spork.each_run do
  FactoryGirl.reload
end

def login_as(user)
  session[:user_id] = user.id
end
