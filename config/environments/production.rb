Questlog::Application.configure do

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

  config.serve_static_assets = false

  config.assets.js_compressor = :uglifier
  config.assets.css_compressor = :sass

  config.assets.compile = false

  config.assets.digest = true

  config.assets.version = '1.0'

  config.log_level = :info

  config.i18n.fallbacks = true

  config.active_support.deprecation = :notify

  config.log_formatter = ::Logger::Formatter.new

end
