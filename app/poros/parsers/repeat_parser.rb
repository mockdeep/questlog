class RepeatParser

  def parse(title)
    result = TimeframeParser.new.parse(title, '\*')
    { title: result[:title], repeat_seconds: result[:seconds] }
  end

end
