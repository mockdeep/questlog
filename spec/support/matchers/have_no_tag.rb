module Questlog

  module Matchers

    class HaveNoTag

      attr_accessor :actual, :expected

      def initialize(expected)
        self.expected = expected
      end

      def matches?(actual)
        self.actual = actual
        actual.has_no_selector?(TAGS_SELECTOR, text: expected)
      end

      def failure_message
        %(expected not to find tag "#{expected}", but it is present)
      end

    end

  end

end
