# frozen_string_literal: true

module Views
  module TreeTasks
    class Index < Views::Base
      def initialize(nodes:)
        @nodes = nodes
        super()
      end

      def view_template
        render(Tasks::New.new)
        br
        render(Tasks::ListFilters.new)
        turbo_frame_tag("task-tree") { render(Tree.new(nodes: @nodes)) }
      end
    end
  end
end
