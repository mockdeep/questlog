module Questlog

  module Matchers

    class HaveTask

      attr_accessor :expected, :actual

      def initialize(expected)
        self.expected = expected
      end

      def matches?(actual)
        self.actual = actual
        actual.has_selector?("#{TITLE_SELECTOR}[value='#{expected}']")
      end

      def failure_message
        base_message = %(expected to find task title "#{expected}",)
        if actual.has_selector?(TITLE_SELECTOR)
          %(#{base_message} but had "#{actual_title}")
        else
          %(#{base_message} but no task found)
        end
      end

    private

      def actual_title
        actual.find(TITLE_SELECTOR).value
      end

    end

  end

end
