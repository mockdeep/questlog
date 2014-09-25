class EstimateParser

  def parse(title)
    result = TimeframeParser.new.parse(title, '~')
    { title: result[:title], estimate_seconds: result[:seconds] }
  end

end
