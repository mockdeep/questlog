source 'https://rubygems.org'
source 'https://rails-assets.org'

ruby '2.1.5'

# needs to be included before any other gems that use environment variables
gem 'dotenv-rails', groups: [:development, :test]

gem 'rails', '~> 4.2.0'

gem 'active_model_serializers'
gem 'autoprefixer-rails'
gem 'bcrypt'
gem 'browserify-rails', '~> 0.8.3'
gem 'dalli'
gem 'friendly_id'
gem 'haml-rails'
gem 'honeybadger'
gem 'jquery-rails'
gem 'newrelic_rpm'
gem 'pg'
gem 'puma'
gem 'puma_worker_killer'
gem 'rack-cache'
gem 'rack-mini-profiler'
gem 'react-rails'
gem 'sidekiq'
gem 'skylight'
gem 'stripe'

gem 'rails-assets-lodash'
gem 'rails-assets-normalize.css'
gem 'rails-assets-react-dnd'
gem 'rails-assets-reqwest'

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
  gem 'bullet'
  gem 'factory_girl_rails'
  gem 'faker'
  gem 'guard'
  gem 'rspec-rails'
  gem 'guard-rubocop'
  gem 'haml-lint'
  gem 'scss-lint'
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
