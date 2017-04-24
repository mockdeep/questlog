module Serializable

  module Config

    def self.key_format=(key_format)
      @key_format = key_format
    end

    def self.key_format
      @key_format ||= :camelcase
    end

  end

end
