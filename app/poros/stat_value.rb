class StatValue

  def self.new(user:, value:)
    return value if value
    last_done_at = user.tasks.maximum(:done_at)

    return 30.minutes unless last_done_at

    time_since_last = Time.zone.now - last_done_at
    case time_since_last
    when (1.minute..30.minutes)
      time_since_last
    else
      30.minutes
    end
  end

end
