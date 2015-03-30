uri = URI.parse(ENV.fetch('REDISTOGO_URL') { 'redis://localhost:6379' })
storage_options = { host: uri.host, port: uri.port, password: uri.password }
Rack::MiniProfiler.config.tap do |config|
  config.storage_options = storage_options
  config.storage = Rack::MiniProfiler::RedisStore
  config.start_hidden = Rails.env.production?
end
