class TagParser

  def parse(title)
    words = title.split
    tags = words.select { |word| tag?(word) }
    words.delete_if { |word| tag?(word) }
    tags = tags.map { |tag| tag[1..-1] }
    [words.join(' '), tags]
  end

  def tag?(word)
    word.match(/^\#\w+/) && !word.match(/^\#\d+$/)
  end

end
