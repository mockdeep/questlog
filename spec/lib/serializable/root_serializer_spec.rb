RSpec.describe Serializable::RootSerializer do
  describe '.call' do
    it 'raises an error when invalid options are passed' do
      expected_error = 'invalid serializer options: [:boogers], ' \
          'allowed options are [:meta, :included]'

      expect { described_class.(Object.new, boogers: 'bar') }
        .to raise_error(expected_error)
    end

    it 'raises an error when :meta key is not a hash' do
      expect { described_class.(Object.new, meta: 'bar') }
        .to raise_error('"meta" key must be a hash')
    end

    it 'raises an error when :included key is not a collection' do
      expect { described_class.(Object.new, included: 'bar') }
        .to raise_error('"included" key must be a collection')
    end
  end
end
