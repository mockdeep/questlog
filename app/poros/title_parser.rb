class TitleParser

  PARSERS = [
    TagParser,
    PriorityParser,
    RepeatParser,
    EstimateParser,
    ReleaseAtParser,
  ]

  def parse(title)
    return {} unless title

    parsed_results(title).delete_if { |_, value| value.blank? }
  end

private

  def parsed_results(title)
    PARSERS.each_with_object(title: title) do |parser, result|
      result.merge!(parser.new.parse(result[:title]))
    end
  end

end
