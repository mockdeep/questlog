source 'https://rubygems.org'

ruby '2.3.1'

# needs to be included before any other gems that use environment variables
gem 'dotenv-rails', groups: [:development, :test]

gem 'rails', '~> 4.2.0'

# https://github.com/rails-api/active_model_serializers/issues/1745
gem 'active_model_serializers', '~> 0.9.4'
gem 'autoprefixer-rails'
gem 'bcrypt'
gem 'browserify-rails'
gem 'dalli'
gem 'friendly_id'
gem 'gon'
gem 'haml-rails'
gem 'honeybadger'
gem 'hstore_accessor'
gem 'jquery-rails'
gem 'newrelic_rpm'
gem 'normalize-rails'
gem 'pg'
gem 'puma'
gem 'puma_worker_killer'
gem 'rack-cache'
gem 'rack-mini-profiler'
gem 'sidekiq'
gem 'skylight'
gem 'stripe'

group :production do
  gem 'rails_12factor'
end

gem 'bootstrap-sass'
gem 'font-awesome-sass'
gem 'sass-rails'
gem 'uglifier'

group :development do
  gem 'better_errors'
  gem 'binding_of_caller'
  gem 'quiet_assets'
  gem 'spring-commands-rspec'
end

group :development, :test do
  # https://github.com/flyerhzm/bullet/issues/251
  gem 'bullet', '4.14.4'
  gem 'byebug'
  gem 'factory_girl_rails'
  gem 'faker'
  gem 'guard'
  gem 'rspec-rails'
  gem 'guard-rubocop'
  gem 'haml_lint', require: false
  gem 'rubocop', require: false
  gem 'scss_lint', require: false
  gem 'shoulda-matchers'
end

group :test do
  gem 'capybara'
  gem 'capybara-webkit'
  gem 'coderay'
  gem 'database_cleaner'
  gem 'guard-rspec'
  gem 'launchy'
  gem 'poltergeist'
  gem 'rb-inotify'
  gem 'rspec_junit_formatter', require: false
  gem 'selenium-webdriver'
  gem 'simplecov'
  gem 'timecop'
  gem 'vcr'
  gem 'webmock'
end
