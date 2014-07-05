class TitleParser

  def parse_title(title)
    result = {}
    title, result[:tag_names] = parse_tags(title)
    title, result[:priority] = parse_priority(title)
    result[:title] = title
    result
  end

  def parse_priority(title)
    words = title.split
    index = words.index { |word| word.match(/^!\d$/) }
    match = words.delete_at(index) if index
    priority = Integer(match[1..-1]) if match
    [words.join(' '), priority]
  end

  def parse_tags(title)
    TagParser.new.parse(title)
  end

  def parse_release_at(title)
    words = title.split
    tags = words.select { |word| word.match(/^\^\S+$/) }
    timestamp = find_timestamp(tags)

    if timestamp
      time = time_from_stamp(timestamp)
      words.delete(timestamp)
    end
    [words.join(' '), time]
  end

private

  def find_timestamp(tags)
    tags.detect do |word|
      begin
        Time.zone.parse(word[1..-1])
      rescue ArgumentError
        nil
      end
    end
  end

  def time_from_stamp(timestamp)
    time = Time.zone.parse(timestamp[1..-1])
    if time.today? && time < Time.zone.now
      time + 1.day
    elsif time >= Time.zone.now
      time
    end
  end

end
