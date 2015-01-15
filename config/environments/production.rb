Rails.application.configure do

  config.cache_classes = true

  config.eager_load = true

  config.consider_all_requests_local       = false
  config.action_controller.perform_caching = true

  config.cache_store = :dalli_store,
                       ENV['MEMCACHIER_SERVERS'].split(','),
                       {
                         username: ENV['MEMCACHIER_USERNAME'],
                         password: ENV['MEMCACHIER_PASSWORD'],
                         socket_timeout: 1.5,
                         socket_failure_delay: 0.2,
                       }
  # Enable Rack::Cache to put a simple HTTP cache in front of your application
  # Add `rack-cache` to your Gemfile before enabling this.
  # For large-scale production use, consider using a caching reverse proxy like
  # NGINX, varnish or squid.
  # config.action_dispatch.rack_cache = true

  config.serve_static_files = ENV['RAILS_SERVE_STATIC_FILES'].present?

  config.assets.js_compressor = :uglifier
  config.assets.css_compressor = :sass

  config.assets.compile = false

  config.assets.digest = true

  config.force_ssl = true

  config.log_level = :debug

  config.i18n.fallbacks = true

  config.active_support.deprecation = :notify

  config.log_formatter = ::Logger::Formatter.new

  config.active_record.dump_schema_after_migration = false
end
