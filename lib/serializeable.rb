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

  def self.included(base)
    base.public_send :extend, ClassMethods
  end

  def call(object)
    serialize_object(object)
  end

  def serialize(object)
    return object if BASE_CLASSES.include?(object.class.name)

    serializer_for(object).(object)
  end

  def serializer_for(object)
    if object.respond_to?(:to_ary)
      CollectionSerializer
    else
      "#{object.class}Serializer".constantize
    end
  rescue NameError
    raise SerializerError, "no serializer found for #{object.class}"
  end

  def serialize_object(object)
    self.class.serialized_attributes.each_with_object({}) do |attribute, result|
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

end
