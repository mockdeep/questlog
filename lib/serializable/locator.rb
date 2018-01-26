module Serializable

  class Locator

    BASE_CLASSES = Set.new(
      %w[Hash NilClass String Fixnum FalseClass Integer TrueClass Time],
    )

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
