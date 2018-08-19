source 'https://rubygems.org'

ruby File.read('./.ruby-version').strip

# needs to be included before any other gems that use environment variables
gem 'dotenv-rails', groups: %i[development test]

gem 'rails', '~> 5.2.0'

gem 'autoprefixer-rails'
gem 'bcrypt'
gem 'bootsnap', require: false
gem 'dalli'
gem 'friendly_id'
gem 'gon'
gem 'haml-rails'
gem 'honeybadger'
gem 'junk_drawer'
gem 'newrelic_rpm'
gem 'normalize-rails'
gem 'pg'
gem 'pry'
gem 'puma'
gem 'puma_worker_killer'
gem 'sidekiq'
gem 'skylight'
gem 'stripe'
gem 'webpacker'

gem 'bootstrap-sass'
gem 'font-awesome-sass'
gem 'sass-rails'
gem 'uglifier'

group :development do
  gem 'better_errors'
  gem 'binding_of_caller'
  gem 'spring-commands-rspec'
end

group :development, :test do
  gem 'bullet'
  gem 'factory_bot_rails'
  gem 'faker'
  gem 'guard'
  gem 'guard-rubocop'
  gem 'haml_lint', require: false
  gem 'pry-byebug'
  gem 'rspec-rails'
  gem 'rubocop', require: false
  gem 'rubocop-rspec', require: false
  gem 'shoulda-matchers'
end

group :test do
  gem 'capybara'
  gem 'capybara-screenshot', require: false
  gem 'guard-rspec'
  gem 'rb-inotify'
  gem 'rspec_junit_formatter', require: false
  gem 'selenium-webdriver'
  gem 'simplecov'
  gem 'timecop'
  gem 'vcr'
  gem 'webmock'
end
