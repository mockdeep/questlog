module Questlog

  module Matchers

    class HaveNoTaskWithTitle

      attr_accessor :expected, :actual

      def initialize(expected)
        self.expected = expected
      end

      def matches?(actual)
        self.actual = actual
        actual.has_no_selector?(TITLE_SELECTOR, text: expected)
      end

      def failure_message
        %(expected not to find task "#{expected}", but it is present)
      end

    end

  end

end
