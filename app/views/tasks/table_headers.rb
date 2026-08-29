# frozen_string_literal: true

module Views
  module Tasks
    class TableHeaders < Views::Base
      def initialize(heading:, spaces:)
        @heading = heading
        @spaces = spaces
        super()
      end

      def view_template
        thead do
          tr(class: "tasks-table__header-row") do
            headings.each { |label| header_cell { label } }
          end
        end
      end

      private

      def headings
        [nil, @heading, nil, "Estimate", nil, "Priority", timeframe, nil]
      end

      def timeframe
        "Timeframe" if @spaces
      end

      def header_cell(&)
        th(class: "tasks-table__header", &)
      end
    end
  end
end
