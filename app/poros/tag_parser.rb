class TagParser

  def parse(title)
    tag_names = []
    tag_regexes.each do |regex|
      title.scan(regex) do |matches|
        tag_names << matches.first
      end
      title = title.gsub(regex, '').strip
    end
    [title, tag_names]
  end

  def tag_regexes
    [/\#(\w+)/, /\#"(.*?)"/, /\#'(.*?)'/]
  end

end
