class TimeframesController < ApplicationController

  def index
    render(
      json: Timeframe.for(user: current_user),
      meta: { medianProductivity: current_user.stats.median_productivity },
    )
  end

end
