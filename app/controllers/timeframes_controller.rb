class TimeframesController < ApplicationController

  def index
    timeframe = Timeframe.for(user: current_user)
    meta = { medianProductivity: current_user.stats.median_productivity }

    render(json: serialize(timeframe, meta: meta))
  end

end
