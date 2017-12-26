RSpec.describe Matchers::HaveTask do

  let(:matcher) { described_class.new('foo title') }

  describe '#matches?' do
    it 'returns true when there is a title node with the given text' do
      node = Capybara.string(<<-HTML)
        <div id="task"><input class="task-input" value="foo title" /></div>
      HTML

      expect(matcher.matches?(node)).to be true
    end

    it 'returns false when there is a title node with different text' do
      node = Capybara.string(<<-HTML)
        <div id="task"><input class="task-input" value="bar title" /></div>
      HTML

      expect(matcher.matches?(node)).to be false
    end

    it 'returns false when there is no title node' do
      node = Capybara.string('<div id="task">foo title</div>')

      expect(matcher.matches?(node)).to be false
    end
  end

  describe '#failure_message' do
    it 'returns a message with the actual task when present' do
      node = Capybara.string(<<-HTML)
        <div id="task"><input class="task-input" value="bar title" /></div>
      HTML
      expected = "expected to find task title 'foo title', but had 'bar title'"

      matcher.matches?(node)

      expect(matcher.failure_message).to eq expected
    end

    it 'returns a message with no task found when none present' do
      node = Capybara.string('<div id="task">bar title</div>')
      expected = "expected to find task title 'foo title', but no task found"

      matcher.matches?(node)

      expect(matcher.failure_message).to eq expected
    end
  end

end
