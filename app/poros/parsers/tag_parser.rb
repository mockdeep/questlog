class TagParser

  include Callable

  def call(title)
    words = title.split
    tags = words.select { |word| tag?(word) }
    words.delete_if { |word| tag?(word) }
    tags = tags.map { |tag| tag[1..-1] }
    { title: words.join(' '), tag_names: tags }
  end

private

  def tag?(word)
    word.match(/^\#\w+/) && !word.match(/^\#\d+$/)
  end

end
