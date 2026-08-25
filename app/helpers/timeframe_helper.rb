# frozen_string_literal: true

module TimeframeHelper
  LABELS = {
    inbox: "Inbox",
    today: "Today",
    week: "This Week",
    month: "This Month",
    quarter: "This Quarter",
    year: "This Year",
    lustrum: "This Lustrum",
    decade: "This Decade",
  }.freeze

  def timeframe_label(name)
    LABELS[name.to_sym]
  end

  def timeframe_section_class(timeframe)
    timeframe.name == "inbox" ? "inbox" : "timeframe"
  end

  def timeframe_ratio(timeframe)
    "#{timeframe.minute_total}/#{timeframe_maximum(timeframe)}"
  end

  def timeframe_over_limit?(timeframe)
    timeframe_space_of(timeframe).negative?
  end

  # how many minutes each timeframe has left, keyed by name
  def timeframe_spaces(timeframes)
    timeframes.to_h { |frame| [frame.name, timeframe_space_of(frame)] }
  end

  def timeframe_options(task, spaces)
    options =
      Timeframe::DISPLAY_NAMES.map do |name|
        [
          timeframe_option_text(name, task, spaces),
          name,
          { disabled: !timeframe_room_for?(name, task, spaces) },
        ]
      end

    options_for_select(options, task.timeframe || "inbox")
  end

  private

  def timeframe_maximum(timeframe)
    timeframe.minute_max || "∞"
  end

  def timeframe_space_of(timeframe)
    (timeframe.minute_max || Float::INFINITY) - timeframe.minute_total
  end

  def timeframe_option_text(name, task, spaces)
    title = name == "inbox" ? "-" : timeframe_label(name)
    space = spaces[name]
    return title if (task.timeframe || "inbox") == name || space.infinite?

    "#{title} (#{space})"
  end

  def timeframe_room_for?(name, task, spaces)
    spaces[name] >= task.estimate_minutes
  end
end
