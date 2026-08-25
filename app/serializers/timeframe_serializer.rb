# frozen_string_literal: true

class TimeframeSerializer
  include Serializable

  serialize(:name, :current_tasks, :minute_max, :minute_total, :pending_tasks)
end
