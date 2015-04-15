require File.expand_path('../boot', __FILE__)

require 'rails/all'

Bundler.require(*Rails.groups)

module Questlog

  class Application < Rails::Application

    config.autoload_paths << Rails.root.join('lib')

    config.time_zone = 'Pacific Time (US & Canada)'

    config.active_record.raise_in_transactional_callbacks = true

    config.react.addons = true

  end

end
