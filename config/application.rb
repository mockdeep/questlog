require File.expand_path('../boot', __FILE__)

require 'rails/all'

Bundler.require(*Rails.groups)

module Questlog

  class Application < Rails::Application

    config.autoload_paths << Rails.root.join('lib')
    config.autoload_paths << Rails.root.join('app', 'poros', 'parsers')

    config.time_zone = 'Pacific Time (US & Canada)'

    config.active_record.raise_in_transactional_callbacks = true

    browserify_options = '--transform reactify --extension=".jsx"'
    config.browserify_rails.commandline_options = browserify_options

  end

end
