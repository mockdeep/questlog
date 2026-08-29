# frozen_string_literal: true

module Views
  module Tasks
    class Table < Views::Base
      def initialize(tasks:, table_id:, heading:, status:, draggable:)
        @tasks = tasks
        @table_id = table_id
        @heading = heading
        @status = status
        @draggable = draggable
        super()
      end

      def view_template
        return if @tasks.none?

        div(id: @table_id) do
          table(class: "tasks-table") do
            render(TableHeaders.new(heading: @heading, spaces: nil))
            tbody { @tasks.each { |task| render(row(task)) } }
          end
        end
      end

      private

      def row(task)
        Row.new(task:, status: @status, spaces: nil, draggable: @draggable)
      end
    end
  end
end
