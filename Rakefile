# frozen_string_literal: true

require_relative "config/application"

Rails.application.load_tasks

if Rails.env.local?
  require "rubocop/rake_task"
  RuboCop::RakeTask.new

  task default: [:rubocop]
end
