RSpec.describe Serializable::Locator do
  describe '.call' do
    it 'raises an error when serializer cannot be found' do
      expect { described_class.(Object.new) }
        .to raise_error('no serializer found for Object')
    end
  end
end
