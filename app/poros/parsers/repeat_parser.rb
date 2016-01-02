class RepeatParser

  include Callable

  def call(title)
    result = TimeframeParser.(title, '\*')
    { title: result[:title], repeat_seconds: result[:seconds] }
  end

end
