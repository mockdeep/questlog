# frozen_string_literal: true

class JsonConstraint
  def matches?(request)
    request.headers["Accept"].include?("application/json")
  end
end
