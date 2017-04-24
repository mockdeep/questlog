module Serializable

  class SerializerError < StandardError; end

  # concerns
  #     {
  #       data: [one_model, two_model],
  #       meta: "some meta info",
  #       included: [some_associated_model]
  #     }
  # sub-class serializers

  module ClassMethods

    delegate :call, to: :new

    def serialize(*attributes)
      @serialized_attributes = attributes
    end

    def serialized_attributes
      @serialized_attributes
    end

  end

  module InstanceMethods

    KEY_TRANSFORMS = {
      camelcase: ->(key) { key.to_s.camelize(:lower) },
      snakecase: ->(key) { key },
    }.freeze

    def call(object)
      serialized_attributes.each_with_object({}) do |attribute, result|
        value = fetch_attribute(attribute, object)
        result[key_name(attribute)] = serialize(value)
      end
    end

    def key_name(attribute)
      KEY_TRANSFORMS.fetch(Config.key_format).(attribute).to_sym
    end

    def serialize(object)
      Locator.(object).(object)
    end

    def fetch_attribute(attribute, object)
      if respond_to?(attribute)
        public_send(attribute, object)
      else
        object.public_send(attribute)
      end
    end

    def serialized_attributes
      self.class.serialized_attributes
    end

  end

  def self.included(base)
    base.public_send :extend, ClassMethods
    base.public_send :include, InstanceMethods
  end

end
