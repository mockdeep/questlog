class TitleParser

  PARSERS = [
    TagParser,
    PriorityParser,
    RepeatParser,
    EstimateParser,
    ReleaseAtParser,
  ]

  def parse(title)
    result = {}
    return result unless title

    PARSERS.each do |parser|
      title, result[parser.key] = parser.new.parse(title)
    end

    result[:title] = title
    result.delete_if { |_, value| value.blank? }
    result
  end

end
