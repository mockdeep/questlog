# frozen_string_literal: true

require "capybara/rails"

Capybara.enable_aria_label = true
Capybara.server = :puma, { Silent: true }

driver = ENV.fetch("DRIVER", :firefox).to_sym

RSpec.configure do |config|
  config.before(:each, type: :system) do
    driven_by(:selenium, using: driver)
  end
end
