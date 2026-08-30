# frozen_string_literal: true

module Views
  module Tasks
    class Focus < Views::Base
      register_output_helper :dialog_link_to

      def initialize(board:)
        @board = board
        super()
      end

      def view_template
        content_for(:title, title)
        turbo_frame_tag("focus") { task ? task_display : no_tasks }
        hr
        render(New.new)
        footer(class: "task-footer") { footer_content }
      end

      private

      def task
        @board.task
      end

      def title
        task ? task.title : "(no tasks!)"
      end

      def task_display
        render(TagButtons.new(tags: @board.tags, task:, slug: @board.slug))
        div(class: "row") { render(BreadCrumbs.new(task:)) }
        render(TaskTitle.new(task:))
        render(MainButtons.new(task:))
      end

      def no_tasks
        div { h2 { "No tasks! Try adding one below:" } }
      end

      def footer_content
        br
        link_to("Add multiple tasks", new_bulk_task_path)
        whitespace
        plain("|")
        whitespace
        dialog_link_to("Help", help_index_path)
        br
        tag_hint
      end

      def tag_hint
        plain('Try adding a tag using "#", for example: ')
        strong { "#home" }
        plain(" or ")
        strong { "#5-min" }
        plain(". Click ")
        dialog_link_to("help", help_index_path)
        plain(" for more.")
      end
    end
  end
end
