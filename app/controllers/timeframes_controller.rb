# frozen_string_literal: true

class TimeframesController < ApplicationController
  def index
    respond_to do |format|
      format.json { render(json: serialize(timeframes, meta:)) }
      format.html
    end
  end

  private

  def timeframes
    TimeframeList.for(user: current_user, median_productivity:)
  end

  def median_productivity
    @median_productivity ||= current_user.stats.median_productivity
  end

  def meta
    { medianProductivity: median_productivity }
  end
end
