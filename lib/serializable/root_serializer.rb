module Serializable

  class RootSerializer

    include Serializable::InstanceMethods

    def self.call(*args)
      new.(*args)
    end

    def call(object, **options)
      validate_options(options)
      result = { data: serialize(object) }
      result[:meta] = options[:meta] if options.key?(:meta)

      if options.key?(:included)
        result[:included] = serialize(options[:included])
      end

      result
    end

  private

    def validate_options(options)
      allowed_keys = %i[meta included]
      invalid_keys = options.keys - allowed_keys
      if invalid_keys.any?
        raise "invalid serializer options: #{invalid_keys}, " \
          "allowed options are #{allowed_keys}"
      end

      if options.key?(:meta) && !options[:meta].is_a?(Hash)
        raise '"meta" key must be a hash'
      end

      if options.key?(:included) && !options[:included].respond_to?(:to_ary)
        raise '"included" key must be a collection'
      end
    end

  end

end
