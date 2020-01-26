RSpec.describe Serializable::Config do
  after do
    described_class.remove_instance_variable(:@key_format)
  end

  describe '#key_format=' do
    it 'sets a new key format' do
      described_class.key_format = :butt_format

      expect(described_class.key_format).to eq(:butt_format)
    end
  end

  describe '#key_format' do
    it 'returns the set key format' do
      described_class.key_format = :butt_format

      expect(described_class.key_format).to eq(:butt_format)
    end

    it 'returns :camelcase by default' do
      expect(described_class.key_format).to eq(:camelcase)
    end
  end
end
