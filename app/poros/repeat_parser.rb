class RepeatParser

  def self.key
    :repeat_seconds
  end

  def parse(title)
    TimeframeParser.new.parse(title, '\*')
  end

end
