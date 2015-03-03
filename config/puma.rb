workers Integer(ENV['WEB_CONCURRENCY'] || 1)
threads_count = Integer(ENV['MAX_THREADS'] || 2)
threads threads_count, threads_count

preload_app!

rackup DefaultRackup
port ENV['PORT'] || 3000
environment ENV['RACK_ENV'] || 'development'

on_worker_boot do
  config = ActiveRecord::Base.configurations[Rails.env]
  config['reaping_frequency'] = ENV['DB_REAP_FREQ'] || 10 # seconds
  config['pool'] = ENV['DB_POOL'] || 20
  ActiveRecord::Base.establish_connection(config)
end
