class ReleaseAtParser

  include JunkDrawer::Callable

  def call(title)
    words = title.split
    tags = words.select { |word| word.match(/^\@\S+$/) }
    timestamp = find_timestamp(tags)

    if timestamp
      time = time_from_stamp(timestamp)
      words.delete(timestamp)
    end
    { title: words.join(' '), release_at: time }
  end

private

  def find_timestamp(tags)
    tags.detect do |word|

      Time.zone.parse(word[1..-1])
    rescue ArgumentError
      nil

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
