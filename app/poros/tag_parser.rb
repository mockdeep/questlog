class TagParser

  def parse(title)
    tag_names = []
    title.scan(tag_regex) do |matches|
      tag_names << matches.first
    end
    title = title.gsub(tag_regex, '').strip
    [title, tag_names]
  end

  def tag_regex
    /\#(\S+)/
  end

end
