Rails.application.configure do

  config.action_controller.action_on_unpermitted_parameters = :raise

  config.cache_store = :memory_store

  config.cache_classes = false

  config.eager_load = false

  config.consider_all_requests_local       = true
  config.action_controller.perform_caching = true

  config.action_mailer.raise_delivery_errors = true

  config.active_support.deprecation = [:log, :stderr]

  config.active_record.migration_error = :page_load

  config.assets.debug = true

  config.assets.digest = true

  config.assets.raise_runtime_errors = true

  config.action_view.raise_on_missing_translations = true

  config.after_initialize do
    Bullet.alert = true
  end

end
