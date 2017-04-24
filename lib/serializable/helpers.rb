module Serializable

  module Helpers

    def serialize(*args)
      Serializable::RootSerializer.(*args)
    end

  end

end
