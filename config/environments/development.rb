Rails.application.configure do
  # Make javascript_pack_tag load assets from webpack-dev-server.
  config.x.webpacker[:dev_server_host] = 'http://localhost:8080'

  config.action_controller.action_on_unpermitted_parameters = :raise

  config.cache_classes = false

  config.eager_load = false

  config.consider_all_requests_local = true

  config.action_controller.perform_caching = true

  config.cache_store = :memory_store
  config.public_file_server.headers = {
    'Cache-Control' => 'public, max-age=172800',
  }

  config.action_mailer.raise_delivery_errors = true

  config.action_mailer.perform_caching = false

  config.active_support.deprecation = [:log, :stderr]

  config.active_record.migration_error = :page_load

  config.assets.debug = true

  config.assets.quiet = true

  config.action_view.raise_on_missing_translations = true

  config.file_watcher = ActiveSupport::EventedFileUpdateChecker

end
