class PriorityParser

  include Callable

  def call(title)
    words = title.split
    index = words.index { |word| word.match(/^!\d$/) }
    index ||= words.index { |word| word.match(/^'\d$/) }
    match = words.delete_at(index) if index
    priority = Integer(match[1..-1]) if match
    { title: words.join(' '), priority: priority }
  end

end
