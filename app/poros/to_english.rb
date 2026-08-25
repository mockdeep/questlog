# frozen_string_literal: true

# Renders a number of seconds the way a person would say it, e.g. "1 hour,
# 5 minutes". Anything under a minute is given in seconds.
class ToEnglish
  ONE_MINUTE = 60
  ONE_HOUR = ONE_MINUTE * 60

  def self.seconds(count)
    new(count).()
  end

  def initialize(count)
    @count = count
  end

  def call
    raise(RangeError, "number must not be negative") if count.negative?
    return "None" if count < 1
    return phrase(count.floor, "second") if count < ONE_MINUTE

    [hours_phrase, minutes_phrase].compact.join(", ")
  end

  private

  attr_reader :count

  def hours_phrase
    phrase(hours, "hour") if hours.nonzero?
  end

  def minutes_phrase
    phrase(minutes, "minute") if minutes.nonzero?
  end

  def hours
    (count / ONE_HOUR).floor
  end

  def minutes
    (count % ONE_HOUR / ONE_MINUTE).floor
  end

  def phrase(number, word)
    "#{number} #{number == 1 ? word : word.pluralize}"
  end
end
