require_relative 'boot'

require 'rails'
require 'active_job/railtie'
require 'active_model/railtie'
require 'active_record/railtie'
require 'action_controller/railtie'
require 'action_mailer/railtie'
require 'action_view/railtie'
require 'sprockets/railtie'

Bundler.require(*Rails.groups)

module Questlog

  class Application < Rails::Application

    config.active_job.queue_adapter     = :sidekiq
    config.active_job.queue_name_prefix = "questlog_#{Rails.env}"

    config.autoload_paths << Rails.root.join('lib')
    config.autoload_paths << Rails.root.join('app', 'poros', 'parsers')

    config.time_zone = 'Pacific Time (US & Canada)'

    browserify_options = '-t babelify --extension=".jsx"'
    config.browserify_rails.commandline_options = browserify_options

  end

end
