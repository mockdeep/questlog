module ControllerHelpers

  def rendered
    Capybara.string(response.body)
  end
end
