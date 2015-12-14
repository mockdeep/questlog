source 'https://rubygems.org'

ruby '2.2.3'

# needs to be included before any other gems that use environment variables
gem 'dotenv-rails', groups: [:development, :test]

gem 'rails', '~> 4.2.0'

gem 'active_model_serializers'
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
  gem 'factory_girl_rails'
  gem 'faker'
  gem 'guard'
  gem 'rspec-rails'
  gem 'guard-rubocop'
  gem 'haml-lint', require: false
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
  # https://github.com/teampoltergeist/poltergeist/pull/608
  gem 'poltergeist', github: 'teampoltergeist/poltergeist'
  gem 'rb-inotify'
  gem 'rspec_junit_formatter'
  gem 'selenium-webdriver'
  gem 'simplecov'
  gem 'timecop'
  gem 'vcr'
  gem 'webmock'
end
