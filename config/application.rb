require_relative 'boot'

require 'rails/all'

# Require the gems listed in Gemfile, including any gems
# you've limited to :test, :development, or :production.
Bundler.require(*Rails.groups)

module Questlog
  class Application < Rails::Application
    # Initialize configuration defaults for originally generated Rails version.
    config.load_defaults 7.0

    # Configuration for the application, engines, and railties goes here.
    #
    # These settings can be overridden in specific environments using the files
    # in config/environments, which are processed later.
    #
    # config.time_zone = "Central Time (US & Canada)"
    # config.eager_load_paths << Rails.root.join("extras")

    config.active_job.queue_adapter     = :sidekiq
    config.active_job.queue_name_prefix = "questlog_#{Rails.env}"

    extra_paths = [Rails.root.join('lib'), Rails.root.join('app/poros/parsers')]

    config.autoload_paths += extra_paths
    config.eager_load_paths += extra_paths

    config.time_zone = 'Pacific Time (US & Canada)'

    config.active_support.remove_deprecated_time_with_zone_name = true
  end
end
