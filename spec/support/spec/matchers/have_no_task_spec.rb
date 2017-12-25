RSpec.describe Matchers::HaveNoTask do

  let(:matcher) { described_class.new }

  describe '#matches?' do
    it 'returns true when there is no title node and there is "No tasks"' do
      node = Capybara.string('<div id="task">No tasks!</div>')

      expect(matcher.matches?(node)).to be true
    end

    it 'returns false when there is a title node' do
      node = Capybara.string(<<~HTML)
        <div id="task">No tasks!<span class="title">foo title</span></div>
      HTML

      expect(matcher.matches?(node)).to be false
    end

    it 'returns false when there is no "No tasks" message' do
      node = Capybara.string('<div id="task">word</div>')

      expect(matcher.matches?(node)).to be false
    end
  end

  describe '#failure_message' do
    it 'returns a message when there is a task present' do
      node = Capybara.string(<<~HTML)
        <div id="task"><span class="title">bar title</span></div>
      HTML
      expected = "expected not to find any task title, but found 'bar title'"

      matcher.matches?(node)

      expect(matcher.failure_message).to eq expected
    end

    it 'returns a message with no task found when none present' do
      node = Capybara.string('<div id="task">bar title</div>')
      expected = "expected to find text 'No tasks!', but did not"

      matcher.matches?(node)

      expect(matcher.failure_message).to eq expected
    end
  end

end
