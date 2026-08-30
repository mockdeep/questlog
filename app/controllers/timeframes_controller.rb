# frozen_string_literal: true

class TimeframesController < ApplicationController
  def index
    render(Views::Timeframes::Index.new(timeframes:, median_productivity:))
  end

  private

  def timeframes
    TimeframeList.for(user: current_user, median_productivity:)
  end

  def median_productivity
    @median_productivity ||= current_user.stats.median_productivity
  end
end
