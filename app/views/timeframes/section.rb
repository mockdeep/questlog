# frozen_string_literal: true

module Views
  module Timeframes
    class Section < Views::Base
      register_value_helper :timeframe_label
      register_value_helper :timeframe_over_limit?
      register_value_helper :timeframe_ratio
      register_value_helper :timeframe_section_class

      def initialize(timeframe:, spaces:)
        @timeframe = timeframe
        @spaces = spaces
        super()
      end

      def view_template
        div(id: @timeframe.name, class: section_class) do
          hr
          heading
          table(class: "tasks-table") do
            render(Tasks::TableHeaders.new(heading: "Title", spaces: @spaces))
            tbody { rows }
          end
        end
      end

      private

      def section_class
        timeframe_section_class(@timeframe)
      end

      def heading
        h2 do
          plain(timeframe_label(@timeframe.name))
          whitespace
          span(class: danger) { timeframe_ratio(@timeframe) }
        end
      end

      def danger
        "danger" if timeframe_over_limit?(@timeframe)
      end

      def rows
        @timeframe.current_tasks.each { |task| render(row(task, nil)) }
        @timeframe.pending_tasks.each { |task| render(row(task, "pending")) }
      end

      def row(task, status)
        Tasks::Row.new(task:, spaces: @spaces, status:, draggable: false)
      end
    end
  end
end
