module Matchers

  class HaveNoTask

    attr_accessor :actual

    def matches?(actual)
      self.actual = actual
      actual.has_text?('No tasks!') && actual.has_no_selector?(TITLE_SELECTOR)
    end

    def failure_message
      if actual.has_selector?(TITLE_SELECTOR)
        "expected not to find any task title, but found '#{actual_title}'"
      else
        "expected to find text 'No tasks!', but did not"
      end
    end

  private

    def actual_title
      actual.find(TITLE_SELECTOR).value
    end

  end

  class HaveNoTaskWithTitle

    attr_accessor :expected, :actual

    def initialize(expected)
      self.expected = expected
    end

    def matches?(actual)
      self.actual = actual
      actual.has_no_selector?("#{TITLE_SELECTOR}[value='#{expected}']")
    end

    def failure_message
      "expected not to find task '#{expected}', but it is present"
    end

  end

end

def have_no_task(expected = :__no_title__)
  if expected == :__no_title__
    Matchers::HaveNoTask.new
  else
    Matchers::HaveNoTaskWithTitle.new(expected)
  end
end
