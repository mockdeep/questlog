module Serializeable

  # concerns
  # different types of associations in Rails
  # making sure there are serializers where appropriate (e.g.: models)
  #     {
  #       data: [one_model, two_model],
  #       meta: "some meta info",
  #       included: [some_associated_model]
  #     }

  module ClassMethods

    def serialize(*attributes)
      @serialized_attributes = attributes
    end

    def serialized_attributes
      @serialized_attributes
    end

    def root_name
      name.chomp('Serializer').underscore
    end

  end

  def self.included(base)
    base.public_send :extend, ClassMethods
  end

  def call(object)
    serialize_object(object)
  end

  def serialize(object)
    serializer_for(object).(object)
  end

  def serializer_for(object)
    "#{object.class}Serializer".constantize.new
  end

  def serialize_object(object)
    self.class.serialized_attributes.each_with_object({}) do |attribute, result|
      key_name = attribute.to_s.camelize(:lower).to_sym
      result[key_name] =
        if respond_to?(attribute)
          public_send(attribute, object)
        else
          result[key_name] = object.public_send(attribute)
        end
    end
  end

end
