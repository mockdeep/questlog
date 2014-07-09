class TitleParser

  def parse_title(title)
    result = {}
    return result unless title
    title, result[:tag_names] = parse_tags(title)
    title, result[:priority] = parse_priority(title)
    title, result[:repeat_seconds] = parse_repeat(title)
    title, result[:estimate_seconds] = parse_estimate(title)
    title, result[:release_at] = parse_release_at(title)
    result[:title] = title
    result.delete_if { |_, value| value.blank? }
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

  def parse_repeat(title)
    parse_time(title, '\*')
  end

  def parse_estimate(title)
    parse_time(title, '~')
  end

  def parse_time(title, marker)
    words = title.split
    regex = /^#{marker}(\d+)(#{time_mappings.keys.join('|')})$/
    index = words.index { |word| word.match(regex) }
    if index
      string = words.delete_at(index)
      count, timeframe = string.match(regex).captures
      [words.join(' '), count.to_i * time_mappings[timeframe.to_sym]]
    else
      [title, nil]
    end
  end

private

  def time_mappings
    {
      s: 1.second,
      mi: 1.minute,
      h: 1.hour,
      d: 1.day,
      w: 1.week,
      mo: 1.month,
      y: 1.year,
    }
  end

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
