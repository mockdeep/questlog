source 'https://rubygems.org'

ruby '2.2.2'

# needs to be included before any other gems that use environment variables
gem 'dotenv-rails', groups: [:development, :test]

gem 'rails', '~> 4.2.0'

gem 'active_model_serializers'
gem 'autoprefixer-rails'
gem 'bcrypt'
gem 'browserify-rails'
gem 'dalli'
gem 'friendly_id'
gem 'haml-rails'
gem 'honeybadger'
gem 'hstore_accessor'
gem 'jquery-rails'
gem 'newrelic_rpm'
gem 'pg'
gem 'puma'
gem 'puma_worker_killer'
gem 'rack-cache'
gem 'rack-mini-profiler'
gem 'sidekiq'
gem 'skylight'
gem 'stripe'

source 'https://rails-assets.org' do
  gem 'rails-assets-normalize.css'
end

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
  gem 'bullet', '4.14.4'
  gem 'factory_girl_rails'
  gem 'faker'
  gem 'guard'
  gem 'rspec-rails'
  gem 'guard-rubocop'
  gem 'haml-lint'
  gem 'rubocop'
  gem 'scss-lint'
  gem 'shoulda-matchers', require: false
end

group :test do
  gem 'capybara'
  gem 'capybara-webkit'
  gem 'database_cleaner'
  gem 'guard-rspec'
  gem 'launchy'
  gem 'poltergeist', github: 'teampoltergeist/poltergeist'
  gem 'rb-inotify'
  gem 'selenium-webdriver'
  gem 'simplecov'
  gem 'timecop'
  gem 'vcr'
  gem 'webmock'
end
