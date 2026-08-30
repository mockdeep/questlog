# frozen_string_literal: true

module Views
  module Timeframes
    class Board < Views::Base
      register_value_helper :timeframe_spaces

      def initialize(timeframes:, median_productivity:)
        @timeframes = timeframes
        @median_productivity = median_productivity
        super()
      end

      def view_template
        header(class: "timeframes-header") { h2 { productivity } }
        occupied.each { |timeframe| render(section_for(timeframe)) }
      end

      private

      def productivity
        seconds = ToEnglish.seconds(@median_productivity)

        "Median Productivity: #{seconds} per day"
      end

      def occupied
        @timeframes.reject { |frame| frame.tasks.empty? }
      end

      def section_for(timeframe)
        Section.new(timeframe:, spaces:)
      end

      def spaces
        @spaces ||= timeframe_spaces(@timeframes)
      end
    end
  end
end
