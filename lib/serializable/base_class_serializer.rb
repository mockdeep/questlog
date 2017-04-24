module Serializable

  class BaseClassSerializer

    def self.call(object)
      new.(object)
    end

    def call(object)
      object
    end

  end

end
