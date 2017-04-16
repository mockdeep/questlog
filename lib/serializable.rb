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

  module Config

    def self.key_format=(key_format)
      @key_format = key_format
    end

    def self.key_format
      @key_format ||= :camelcase
    end

  end

  module InstanceMethods

    KEY_TRANSFORMS = {
      camelcase: -> (key) { key.to_s.camelize(:lower) },
      snakecase: -> (key) { key },
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

  module Helpers

    def serialize(*args)
      Serializable::RootSerializer.(*args)
    end

  end

  def self.included(base)
    base.public_send :extend, ClassMethods
    base.public_send :include, InstanceMethods
  end

  class RootSerializer

    include Serializable::InstanceMethods

    def self.call(*args)
      new.(*args)
    end

    def call(object, **options)
      result = { data: serialize(object) }
      result[:meta] = options[:meta] if options.key?(:meta)
      result
    end

  end

  class BaseClassSerializer

    def self.call(object)
      new.(object)
    end

    def call(object)
      object
    end

  end

  class CollectionSerializer

    include Serializable::InstanceMethods

    def self.call(object)
      new.(object)
    end

    def call(object)
      object.map(&method(:serialize))
    end

  end

  class Locator

    BASE_CLASSES = Set.new(%w[NilClass String Fixnum FalseClass TrueClass Time])

    def self.call(object)
      new.(object)
    end

    def call(object)
      class_name = object.class.name
      "#{class_name}Serializer".constantize
    rescue NameError
      if BASE_CLASSES.include?(class_name)
        BaseClassSerializer
      elsif object.respond_to?(:to_ary)
        CollectionSerializer
      else
        raise SerializerError, "no serializer found for #{class_name}"
      end
    end

  end

end
