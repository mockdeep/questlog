module Matchers

  class HaveTask

    attr_accessor :expected, :actual

    def initialize(expected)
      self.expected = expected
    end

    def matches?(actual)
      self.actual = actual
      actual.has_selector?(TITLE_SELECTOR, text: expected)
    end

    def failure_message
      if actual.has_selector?(TITLE_SELECTOR)
        "expected to find task title '#{expected}', but had '#{actual_title}'"
      else
        "expected to find task title '#{expected}', but no task found"
      end
    end

    def failure_message_when_negated
      "expected not to find task title '#{title}', but it is present"
    end

  private

    def actual_title
      actual.find(TITLE_SELECTOR).text
    end

  end

end

def have_task(expected)
  Matchers::HaveTask.new(expected)
end
