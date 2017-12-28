RSpec.describe Matchers::HaveNoTaskWithTitle do

  let(:matcher) { described_class.new('some task') }

  describe '#matches?' do
    it 'returns true when there is no title node and there is "No tasks"' do
      node = Capybara.string('<div id="task">No tasks!</div>')

      expect(matcher.matches?(node)).to be true
    end

    it 'returns true when there is a title node with a different task' do
      node = Capybara.string(<<-HTML)
        <div id="task"><input class="task-input" value="foo title" /></div>
      HTML

      expect(matcher.matches?(node)).to be true
    end

    it 'returns false when there is a title node with that task' do
      node = Capybara.string(<<-HTML)
        <div id="task"><input class="task-input" value="some task" /></div>
      HTML

      expect(matcher.matches?(node)).to be false
    end
  end

  describe '#failure_message' do
    it 'returns a message when the given task is present' do
      node = Capybara.string(<<-HTML)
        <div id="task"><input class="task-input" value="some task" /></div>
      HTML
      expected = 'expected not to find task "some task", but it is present'

      matcher.matches?(node)

      expect(matcher.failure_message).to eq expected
    end
  end

end
