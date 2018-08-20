class HtmlConstraint

  def matches?(request)
    # not all request headers have an 'Accept', so we default to 'text/html'
    accept_format = request.headers['Accept'] || 'text/html'
    accept_format.include?('text/html') || accept_format.include?('*/*')
  end

end
