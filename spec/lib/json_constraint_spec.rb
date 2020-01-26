RSpec.describe JsonConstraint do
  describe '#matches?' do
    it 'returns true when accept headers include "application/json"' do
      request = OpenStruct.new(headers: { 'Accept' => 'application/json' })

      expect(described_class.new.matches?(request)).to be(true)
    end

    it 'returns false when accept headers do not include "application/json"' do
      request = OpenStruct.new(headers: { 'Accept' => '' })

      expect(described_class.new.matches?(request)).to be(false)
    end
  end
end
