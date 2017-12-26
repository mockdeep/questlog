module Matchers

  class HaveTag

    attr_accessor :expected, :actual

    def initialize(expected)
      self.expected = expected
    end

    def matches?(actual)
      self.actual = actual

      actual.has_selector?(TAGS_SELECTOR, text: expected)
    end

    def failure_message
      if actual.has_selector?(TAGS_SELECTOR)
        found_tags = actual.all(TAGS_SELECTOR).map(&:text)

        %(expected to find tag "#{expected}", but found #{found_tags})
      else
        %(expected to find tag "#{expected}", but no tags found)
      end
    end

    def failure_message_when_negated
      %(expected not to find tag "#{expected}", but it is present)
    end

  end

end

def have_tag(expected)
  Matchers::HaveTag.new(expected)
end
