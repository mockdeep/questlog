#!/usr/bin/env rake
# Add your own tasks in files placed in lib/tasks ending in .rake,
# for example lib/tasks/capistrano.rake, and they will automatically be
# available to Rake.

require File.expand_path('../config/application', __FILE__)
Questlog::Application.load_tasks

if Rails.env.test?
  require 'rubocop/rake_task'

  RuboCop::RakeTask.new

  task default: [:spec, :rubocop]
end
