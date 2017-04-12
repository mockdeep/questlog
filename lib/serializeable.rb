module Serializeable

  # concerns
  # different types of associations in Rails
  # array serializer?
  # tying into the controller?
  #   how does AMS handle it?
  #   how does ROAR handle it?
  # making sure there are serializers where appropriate (e.g.: models)
  # what is minimalist json api implementation?
  #   verify:
  #     {
  #       data: [one_model, two_model],
  #       meta: "some meta info",
  #       includes: [some_associated_model]
  #     }
  # should I look into hal format?

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

  def call(object, root: true, meta: nil)
    if root
      serialized = { self.class.root_name => serialize_object(object) }
      serialized[:meta] = meta if meta
      serialized
    else
      serialize_object(object)
    end
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
