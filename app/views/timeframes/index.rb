# frozen_string_literal: true

module Views
  module Timeframes
    class Index < Views::Base
      def initialize(timeframes:, median_productivity:)
        @timeframes = timeframes
        @median_productivity = median_productivity
        super()
      end

      def view_template
        render(Tasks::New.new)
        turbo_frame_tag("timeframes") { render(board) }
      end

      private

      def board
        Board.new(
          timeframes: @timeframes,
          median_productivity: @median_productivity,
        )
      end
    end
  end
end
