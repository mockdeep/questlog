# frozen_string_literal: true

module Views
  module Help
    class Index < Views::Base
      INTRO =
        "You can type different markers when adding your tasks in order " \
        "to set priority, repeats, and so on. Feel free to mix and match! " \
        "Here's a full list:"

      PRIORITY =
        "Set the priority of the task. Priority 1 tasks will appear " \
        "before Priority 2 tasks in your queue, and a task with any " \
        "priority will come before a task with no priority.  '1 is handy " \
        "since !1 can be a pain to type on mobile."

      TAGGING =
        "Adds a tag to the task. When tasks have been tagged, you will " \
        "see buttons on the page which will allow you to select between " \
        "different tags depending on where you're at."

      RELEASE =
        "Sets the date and/or time when a task will be released into your " \
        "queue. So if you set the date for tomorrow at 10:30am, you will " \
        "not see it in your queue until then."

      REPEAT_LEAD =
        "Repeat the task every day, 3 hours, 5 minutes, or 1 year. A " \
        "full list of repeat abbreviations are: "

      ABBREVIATIONS = [
        ["s", "-- seconds,"],
        ["m", "or"],
        ["mi", "-- minutes,"],
        ["h", "-- hours,"],
        ["d", "-- days,"],
        ["mo", "-- months, and"],
        ["y", "-- years."],
      ].freeze

      REPEAT_TAIL =
        "As of yet we don't have a way to repeat at a particular time of " \
        "day or day of the week/month. The repeat will start counting " \
        "from the moment you mark it as done. So if you say *3d, it will " \
        "reappear in your queue 3 days after you mark it as finished."

      ESTIMATE =
        "Sets a time estimate on the task. This impacts how much you are " \
        "allowed to place in timeframes and can be used with smart tags " \
        "to find tasks above or below a certain estimate. It uses the " \
        "same abbreviations as repeats."

      def view_template
        turbo_frame_tag("dialog") { container }
      end

      private

      def container
        div(**container_options) do
          div(class: "dialog-overlay", data: { a11y_dialog_hide: true })
          div(class: "dialog-content", role: "document") { content }
        end
      end

      def container_options
        {
          class: "dialog-container",
          data: { controller: "dialog" },
          aria: { hidden: "true" },
        }
      end

      def content
        close_button
        h3 { "Help" }
        p { INTRO }
        table { markers }
      end

      def close_button
        button(class: "dialog-close", data: { a11y_dialog_hide: true }) do
          i(class: "fas fa-times fa-2x")
        end
      end

      def markers
        thead { tr { headings } }
        tbody do
          priority_row
          tagging_row
          release_row
          repeat_row
          estimate_row
        end
      end

      def headings
        ["marker", "examples", "description"].each { |name| th { name } }
      end

      def priority_row
        tr do
          marker_cell do
            plain("!")
            strong { "or" }
            plain("'")
          end
          cell { "!1 !2 '3" }
          cell { PRIORITY }
        end
      end

      def tagging_row
        row("#", "#at-home #errand #standing-in-line") { plain(TAGGING) }
      end

      def release_row
        examples = "@10:30am @10/05/2015 @10/05/2015-10:30am"

        row("@", examples) { plain(RELEASE) }
      end

      def repeat_row
        row("*", "*1d *3h *5m *1y") { repeat_description }
      end

      def estimate_row
        row("~", "~1d ~3h ~5m") { plain(ESTIMATE) }
      end

      def repeat_description
        plain(REPEAT_LEAD)
        ABBREVIATIONS.each do |code, gloss|
          strong { code }
          whitespace
          plain(gloss)
          whitespace
        end
        plain(REPEAT_TAIL)
      end

      def row(marker, examples, &)
        tr do
          marker_cell { marker }
          cell { examples }
          cell(&)
        end
      end

      def marker_cell(&)
        td(class: "dialog__cell dialog__marker", &)
      end

      def cell(&)
        td(class: "dialog__cell", &)
      end
    end
  end
end
