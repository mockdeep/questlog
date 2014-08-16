class PriorityParser

  def self.key
    :priority
  end

  def parse(title)
    words = title.split
    index = words.index { |word| word.match(/^!\d$/) }
    index ||= words.index { |word| word.match(/^'\d$/) }
    match = words.delete_at(index) if index
    priority = Integer(match[1..-1]) if match
    [words.join(' '), priority]
  end

end
