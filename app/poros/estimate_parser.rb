class EstimateParser

  def self.key
    :estimate_seconds
  end

  def parse(title)
    TimeframeParser.new.parse(title, '~')
  end

end
