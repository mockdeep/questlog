module Questlog

  module Matchers

    TITLE_SELECTOR = '.task-input:not(#new-title)'.freeze
    TAGS_SELECTOR = '.tag-buttons a.button'.freeze

    def have_task(expected)
      HaveTask.new(expected)
    end

    def have_no_task(expected = nil)
      expected ? HaveNoTaskWithTitle.new(expected) : HaveNoTask.new
    end

    def have_tag(expected)
      HaveTag.new(expected)
    end

    def have_no_tag(expected)
      HaveNoTag.new(expected)
    end

  end

end
