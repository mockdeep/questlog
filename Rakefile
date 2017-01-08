require_relative 'config/application'

Rails.application.load_tasks

if Rails.env.test? || Rails.env.development?
  task :mocha do
    puts `npm test`
  end

  require 'rubocop/rake_task'
  RuboCop::RakeTask.new

  require 'haml_lint/rake_task'
  HamlLint::RakeTask.new

  task default: [:rubocop, :haml_lint]
end
