RSpec.describe Questlog::Matchers::HaveNoTag do

  let(:matcher) { described_class.new('foo tag') }

  # TAGS_SELECTOR = '.tag-buttons a.button'.freeze

  describe '#matches?' do
    it 'returns true when there is a tags container but not the given tag' do
      node = Capybara.string('<div class="tag-buttons"></div>')

      expect(matcher.matches?(node)).to be true
    end

    it 'returns false when there is the given tag node' do
      node = Capybara.string(<<-HTML)
        <div class="tag-buttons"><a class='button'>foo tag</a></div>
      HTML

      expect(matcher.matches?(node)).to be false
    end
  end

  describe '#failure_message' do
    it 'returns a message when there is a tag present' do
      node = Capybara.string(<<-HTML)
        <div class="tag-buttons"><a class='button'>foo tag</a></div>
      HTML
      expected = 'expected not to find tag "foo tag", but it is present'

      matcher.matches?(node)

      expect(matcher.failure_message).to eq expected
    end
  end

end
