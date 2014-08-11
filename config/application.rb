require File.expand_path('../boot', __FILE__)

require 'rails/all'

Bundler.require(*Rails.groups)

module Questlog
  class Application < Rails::Application

    config.time_zone = 'Pacific Time (US & Canada)'

  end
end
