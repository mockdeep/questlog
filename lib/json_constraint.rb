class JsonConstraint

  def matches?(request)
    request.headers['Accept'].include?('application/json')
  end

end
