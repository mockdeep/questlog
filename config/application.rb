# frozen_string_literal: true

require_relative "boot"

require "rails/all"

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

    config.active_job.queue_adapter     = :solid_queue
    config.active_job.queue_name_prefix = "questlog_#{Rails.env}"
    config.solid_queue.clear_finished_jobs_after = 14.days

    # The dashboard is mounted behind AdminConstraint in config/routes.rb, so
    # it doesn't need HTTP basic auth.
    config.mission_control.jobs.http_basic_auth_enabled = false

    extra_paths = [
      Rails.root.join("lib"),
      Rails.root.join("app/poros/parsers"),
      Rails.root.join("lib/route_constraints"),
    ]

    config.autoload_paths += extra_paths
    config.eager_load_paths += extra_paths

    config.time_zone = "Pacific Time (US & Canada)"

    config.active_support.remove_deprecated_time_with_zone_name = true
  end
end
