TITLE_SELECTOR = '#task .title'.freeze

RSpec::Matchers.define(:have_task_title) do |title|
  match { |node| node.has_selector?(TITLE_SELECTOR, text: title) }

  failure_message do |actual|
    actual_title = actual.find(TITLE_SELECTOR).text
    "expected to find task title '#{title}' but had '#{actual_title}'"
  end

  failure_message_when_negated do
    "expected not to find task title '#{title}'"
  end

end
