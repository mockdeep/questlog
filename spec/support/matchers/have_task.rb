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
      if actual.has_selector?(TITLE_SELECTOR)
        %(expected to find task title "#{expected}", but had "#{actual_title}")
      else
        %(expected to find task title "#{expected}", but no task found)
      end
    end

  private

    def actual_title
      actual.find(TITLE_SELECTOR).value
    end

  end

end

def have_task(expected)
  Matchers::HaveTask.new(expected)
end
