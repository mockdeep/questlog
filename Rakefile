#!/usr/bin/env rake
# Add your own tasks in files placed in lib/tasks ending in .rake,
# for example lib/tasks/capistrano.rake, and they will automatically be
# available to Rake.

require File.expand_path('../config/application', __FILE__)
Questlog::Application.load_tasks

if Rails.env.test? || Rails.env.development?
  task :mocha do
    puts `npm test`
  end

  require 'rubocop/rake_task'
  RuboCop::RakeTask.new

  require 'haml_lint/rake_task'
  HamlLint::RakeTask.new

  require 'scss_lint/rake_task'
  SCSSLint::RakeTask.new do |t|
    # https://github.com/brigade/scss-lint/issues/726
    # should be able to remove this config once issue is resolved
    t.files = %w(app/assets)
  end

  task default: [:rubocop, :haml_lint, :scss_lint, :mocha]
  task short_checks: [:rubocop, :haml_lint, :scss_lint, :mocha]
end
