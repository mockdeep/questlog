module Matchers

  TITLE_SELECTOR = '.task-input:not(#new-title)'.freeze
  TAGS_SELECTOR = '.tag-buttons a.button'.freeze

  def have_task(expected)
    Matchers::HaveTask.new(expected)
  end

  def have_no_task(expected = :__no_title__)
    if expected == :__no_title__
      Matchers::HaveNoTask.new
    else
      Matchers::HaveNoTaskWithTitle.new(expected)
    end
  end

  def have_tag(expected)
    Matchers::HaveTag.new(expected)
  end

end
