# frozen_string_literal: true

module Views
  module TreeTasks
    class Tree < Views::Base
      def initialize(nodes:)
        @nodes = nodes
        super()
      end

      def view_template
        ul(class: "task-tree") do
          @nodes.each { |node| render(Node.new(node:)) }
        end
      end
    end
  end
end
