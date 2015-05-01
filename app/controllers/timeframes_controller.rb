class TimeframesController < ApplicationController

  def index
    render json: { medianProductivity: current_user.stats.median_productivity }
  end

end
