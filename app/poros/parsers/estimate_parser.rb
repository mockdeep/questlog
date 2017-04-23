class EstimateParser

  include JunkDrawer::Callable

  def call(title)
    result = TimeframeParser.(title, '~')
    { title: result[:title], estimate_seconds: result[:seconds] }
  end

end
