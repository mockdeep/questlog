require_relative 'boot'

require 'rails/all'

Bundler.require(*Rails.groups)

module Questlog

  class Application < Rails::Application

    # Initialize configuration defaults for originally generated Rails version.
    config.load_defaults 5.2

    config.active_job.queue_adapter     = :sidekiq
    config.active_job.queue_name_prefix = "questlog_#{Rails.env}"

    config.autoload_paths << Rails.root.join('lib')
    config.autoload_paths << Rails.root.join('app', 'poros', 'parsers')

    config.eager_load_paths << Rails.root.join('lib')

    config.time_zone = 'Pacific Time (US & Canada)'

  end

end
