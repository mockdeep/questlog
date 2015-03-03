PumaWorkerKiller.config do |config|
  config.ram = (ENV.fetch('PUMA_WORKER_KILLER_RAM') { 512 }).to_i
  config.frequency = (ENV.fetch('PUMA_WORKER_KILLER_FREQUENCY') { 10 }).to_i
  config.percent_usage = (ENV.fetch('PUMA_WORKER_KILLER_PERCENT') { 0.99 }).to_f
end
PumaWorkerKiller.start
