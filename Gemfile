source 'https://rubygems.org'

ruby '2.1.2'

# needs to be included before any other gems that use environment variables
gem 'dotenv-rails', groups: [:development, :test]

gem 'rails', '~> 4.0.8'

gem 'bcrypt-ruby', '~> 3.0.0', require: 'bcrypt'
gem 'foreigner'
gem 'friendly_id'
gem 'haml-rails'
gem 'honeybadger'
gem 'jquery-rails'
gem 'newrelic_rpm'
gem 'pg'
gem 'rack-mini-profiler'
gem 'stripe'
gem 'thin'

group :production do
  gem 'rails_12factor'
end

gem 'bootstrap-sass', '~> 2.3.2'
gem 'font-awesome-sass'
gem 'sass', '~> 3.2.0' # http://bit.ly/VeapJG
gem 'sass-rails'
gem 'uglifier'

group :development do
  gem 'better_errors'
  gem 'binding_of_caller'
  gem 'bullet'
  gem 'quiet_assets'
end

group :development, :test do
  gem 'factory_girl_rails'
  gem 'faker'
  gem 'guard'
  gem 'jasmine'
  gem 'rspec-rails'
  gem 'guard-rubocop'
  gem 'guard-zeus'
  gem 'shoulda-matchers', require: false
end

group :test do
  gem 'capybara'
  gem 'database_cleaner'
  gem 'guard-rspec'
  gem 'launchy'
  gem 'poltergeist'
  gem 'rb-inotify'
  gem 'selenium-webdriver'
  gem 'simplecov'
  gem 'timecop'
  gem 'vcr'
  gem 'webmock'
end
