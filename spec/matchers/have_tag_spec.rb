RSpec.describe Matchers::HaveTag do

  describe '#matches?' do
    it 'returns true when there is a matching tag without count' do
      node = Capybara.string(<<-HTML)
        <div class="tag-buttons"><a class="button">my tag (1)</a></div>
      HTML

      expect(described_class.new('my tag').matches?(node)).to be true
    end

    it 'returns true when there is a matching tag with count' do
      node = Capybara.string(<<-HTML)
        <div class="tag-buttons"><a class="button">my tag (1)</a></div>
      HTML

      expect(described_class.new('my tag (1)').matches?(node)).to be true
    end

    it 'returns false when there are no tags' do
      node = Capybara.string('<div><a>not my tag</a></div>')

      expect(described_class.new('my tag').matches?(node)).to be false
    end

    it 'returns false when there is no matching tag' do
      node = Capybara.string(<<-HTML)
        <div class="tag-buttons"><a class="button">my tag (1)</a></div>
      HTML

      expect(described_class.new('another tag (1)').matches?(node)).to be false
    end

    it 'returns false when there is a matching tag with wrong count' do
      node = Capybara.string(<<-HTML)
        <div class="tag-buttons"><a class="button">my tag (1)</a></div>
      HTML

      expect(described_class.new('my tag (2)').matches?(node)).to be false
    end
  end

  describe '#failure_message' do
    it 'returns a message with a list of tags when there are others' do
      node = Capybara.string(<<-HTML)
        <div class="tag-buttons"><a class="button">my tag (1)</a></div>
      HTML
      matcher = described_class.new('another tag')
      expected = %(expected to find tag "another tag", but found ["my tag (1)"])

      matcher.matches?(node)

      expect(matcher.failure_message).to eq expected
    end

    it 'returns a simple message when there are no tags' do
      node = Capybara.string('<div><a>not my tag</a></div>')
      matcher = described_class.new('my tag')
      expected = 'expected to find tag "my tag", but no tags found'

      matcher.matches?(node)

      expect(matcher.failure_message).to eq expected
    end
  end

  describe '#failure_message_when_negated' do
    it 'returns a simple message when tag is present' do
      node = Capybara.string(<<-HTML)
        <div class="tag-buttons"><a class="button">my tag (1)</a></div>
      HTML
      matcher = described_class.new('my tag')
      expected = 'expected not to find tag "my tag", but it is present'

      matcher.matches?(node)

      expect(matcher.failure_message_when_negated).to eq expected
    end
  end

end
