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

  require 'scss_lint/rake_task'
  SCSSLint::RakeTask.new do |t|
    # https://github.com/brigade/scss-lint/issues/726
    # should be able to remove this config once issue is resolved
    t.files = %w(app/assets)
  end

  task default: [:rubocop, :haml_lint, :scss_lint, :mocha]
  task short_checks: [:rubocop, :haml_lint, :scss_lint, :mocha]
end
