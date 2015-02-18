class HtmlConstraint

  def matches?(request)
    accept_format(request).include?('text/html')
  end

  def accept_format(request)
    # not all request headers have an 'Accept', so we default to 'text/html'
    request.headers['Accept'] || 'text/html'
  end

end
