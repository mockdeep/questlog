source "https://rubygems.org"
git_source(:github) { |repo| "https://github.com/#{repo}.git" }

ruby File.read("./.ruby-version").strip

# needs to be included before any other gems that use environment variables
gem "dotenv-rails", groups: [:development, :test]

gem "rails", "~> 8.1.2"

gem "bcrypt"
gem "bootsnap", require: false
gem "dalli"
gem "friendly_id"
gem "gon"
gem "haml-rails"
gem "honeybadger"
# gem 'image_processing'
gem "cssbundling-rails"
gem "jsbundling-rails"
gem "junk_drawer"
gem "newrelic_rpm"
gem "pg"
gem "puma", "~> 7.0"
gem "puma_worker_killer"
gem "redis"
gem "sidekiq"
gem "skylight"
gem "sprockets-rails"
gem "stimulus-rails"
gem "stripe"
gem "turbo-rails"

gem "uglifier"

group :development do
  gem "better_errors"
  gem "listen"
  gem "spring"
  gem "spring-commands-rspec"
  gem "spring-watcher-listen"
  gem "web-console"
end

group :development, :test do
  gem "factory_bot_rails"
  gem "faker"
  gem "guard"
  gem "guard-rubocop"
  gem "haml_lint", require: false
  gem "rspec-rails"
  gem "rubocop", require: false
  gem "rubocop-capybara", require: false
  gem "rubocop-factory_bot", require: false
  gem "rubocop-rails", require: false
  gem "rubocop-rspec", require: false
  gem "rubocop-rspec_rails", require: false
  gem "shoulda-matchers"
end

group :test do
  gem "capybara"
  gem "capybara-screenshot", require: false
  gem "guard-rspec"
  gem "rb-inotify"
  gem "rspec_junit_formatter", require: false
  gem "selenium-webdriver"
  gem "simplecov"
  gem "webmock"
end
