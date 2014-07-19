class TimeframeParser

  def parse(title, marker)
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
      m: 1.minute,
      h: 1.hour,
      d: 1.day,
      w: 1.week,
      mo: 1.month,
      y: 1.year,
    }
  end

end
