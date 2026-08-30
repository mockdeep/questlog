# frozen_string_literal: true

module Views
  module Alpha
    class Index < Views::Base
      MEANING =
        '"Alpha" means that this feature is under active development and ' \
        "not in a particularly functional state. You may be best to avoid " \
        "it. If you're curious, however, or want to help guide the " \
        "direction of the feature, feel free to take a peek."

      SIMPLICITY =
        "Mostly for the sake of simplicity. When developing features it " \
        "can be helpful to test them out in a real live environment. It " \
        "also seems like it makes for a fun opportunity for users to see " \
        "how the sausage is made and inform the process."

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
        h3 { 'What does "alpha" mean?' }
        meaning
        h3 { "Why make this available?" }
        p { SIMPLICITY }
      end

      def close_button
        button(class: "dialog-close", data: { a11y_dialog_hide: true }) do
          i(class: "fas fa-times fa-2x")
        end
      end

      def meaning
        p do
          plain(MEANING)
          whitespace
          a(href: "mailto:robert@boon.gl") { "Feedback" }
          whitespace
          plain("is very welcome.")
        end
      end
    end
  end
end
