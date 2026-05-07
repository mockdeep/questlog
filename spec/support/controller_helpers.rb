# frozen_string_literal: true

module ControllerHelpers

  def rendered
    Capybara.string(response.body)
  end
end
