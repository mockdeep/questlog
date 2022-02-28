class TimeframesController < ApplicationController
  def index
    timeframe = Timeframe.for(user: current_user)
    meta = { medianProductivity: current_user.stats.median_productivity }

    respond_to do |format|
      format.json { render(json: serialize(timeframe, meta: meta)) }
      format.html { render html: '', layout: 'react' }
    end
  end
end
