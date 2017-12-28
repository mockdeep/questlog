module Matchers

  class HaveNoTask

    attr_accessor :actual

    def matches?(actual)
      self.actual = actual
      actual.has_text?('No tasks!') && actual.has_no_selector?(TITLE_SELECTOR)
    end

    def failure_message
      if actual.has_selector?(TITLE_SELECTOR)
        %(expected not to find any task title, but found "#{actual_title}")
      else
        'expected to find text "No tasks!", but did not'
      end
    end

  private

    def actual_title
      actual.find(TITLE_SELECTOR).value
    end

  end

end
