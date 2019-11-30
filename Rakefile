require_relative 'config/application'

Rails.application.load_tasks

if Rails.env.test? || Rails.env.development?
  require 'rubocop/rake_task'
  RuboCop::RakeTask.new

  require 'haml_lint/rake_task'
  HamlLint::RakeTask.new

  task default: %i[rubocop haml_lint]
end
