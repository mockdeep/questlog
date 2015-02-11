class HtmlConstraint

  def matches?(request)
    request.headers['Accept'].include?('text/html')
  end

end
