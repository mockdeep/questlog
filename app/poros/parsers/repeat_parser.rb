class RepeatParser

  include JunkDrawer::Callable

  def call(title)
    result = TimeframeParser.(title, '\*')
    { title: result[:title], repeat_seconds: result[:seconds] }
  end

end
