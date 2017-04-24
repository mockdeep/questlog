module Serializable

  class CollectionSerializer

    include Serializable::InstanceMethods

    def self.call(object)
      new.(object)
    end

    def call(object)
      object.map(&method(:serialize))
    end

  end

end
