module Serializeable

  class SerializerError < StandardError; end

  BASE_CLASSES = Set.new(%w[NilClass String Fixnum FalseClass TrueClass Time])

  # concerns
  # making sure there are serializers where appropriate (e.g.: models)
  #     {
  #       data: [one_model, two_model],
  #       meta: "some meta info",
  #       included: [some_associated_model]
  #     }
  # sub-class serializers
  # minimizing public API
  # camel vs snake case

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

    def call(object)
      serialize_object(object)
    end

    def serialize(object)
      return object if BASE_CLASSES.include?(object.class.name)

      if object.respond_to?(:to_ary)
        object.map(&method(:serialize))
      else
        serializer_for(object).(object)
      end
    end

    def serializer_for(object)
      "#{object.class}Serializer".constantize
    rescue NameError
      raise SerializerError, "no serializer found for #{object.class}"
    end

    def serialize_object(object)
      serialized_attributes.each_with_object({}) do |attribute, result|
        key_name = attribute.to_s.camelize(:lower).to_sym
        result[key_name] = serialize_attribute(attribute, object)
      end
    end

    def serialize_attribute(attribute, object)
      value =
        if respond_to?(attribute)
          public_send(attribute, object)
        else
          object.public_send(attribute)
        end
      serialize(value)
    end

    def serialized_attributes
      self.class.serialized_attributes
    end

  end

  module Helpers

    def serialize(*args)
      Serializeable::RootSerializer.(*args)
    end

  end

  def self.included(base)
    base.public_send :extend, ClassMethods
    base.public_send :include, InstanceMethods
  end

  class RootSerializer

    include Serializeable::InstanceMethods

    def self.call(*args)
      new.(*args)
    end

    def call(object, **options)
      result = { data: serialize(object) }
      result[:meta] = options[:meta] if options.key?(:meta)
      result
    end

  end

end
