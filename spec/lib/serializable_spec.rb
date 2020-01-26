RSpec.describe Serializable do
  after { Serializable::Config.remove_instance_variable(:@key_format) }

  def stub_classes
    stub_const('TestObjectSerializer', Class.new do
      include Serializable

      serialize :test_attribute
    end)

    stub_const('TestObject', Class.new do
      attr_accessor :test_attribute
    end)
  end

  it 'serializes attributes in camelcase when key format is :camelcase' do
    stub_classes
    Serializable::Config.key_format = :camelcase
    test_object = TestObject.new
    test_object.test_attribute = 'boo'

    expect(TestObjectSerializer.(test_object)).to eq(testAttribute: 'boo')
  end

  it 'serializes attributes in snakecase when key format is :snakecase' do
    stub_classes
    Serializable::Config.key_format = :snakecase
    test_object = TestObject.new
    test_object.test_attribute = 'boo'

    expect(TestObjectSerializer.(test_object)).to eq(test_attribute: 'boo')
  end

  it 'raises an error when an invalid key format is set' do
    stub_classes
    Serializable::Config.key_format = :boogercase

    expect { TestObjectSerializer.(TestObject.new) }
      .to raise_error(KeyError, 'key not found: :boogercase')
  end
end
