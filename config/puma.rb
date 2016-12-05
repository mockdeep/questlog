threads_count = Integer(ENV.fetch('RAILS_MAX_THREADS', 2))
threads threads_count, threads_count

port ENV.fetch('PORT', 3000)

environment ENV.fetch('RAILS_ENV', 'development')

workers Integer(ENV.fetch('WEB_CONCURRENCY', 1))

preload_app!

on_worker_boot do
  config = ActiveRecord::Base.configurations[Rails.env]
  config['reaping_frequency'] = Integer(ENV.fetch('DB_REAP_FREQ', 10)) # seconds
  config['pool'] = ENV.fetch('DB_POOL', 20)
  ActiveRecord::Base.establish_connection(config)
end

plugin :tmp_restart
