class Tag < ApplicationRecord

  class Update

    include JunkDrawer::Callable

    def call(tag, tag_params)
      tag.update!(tag_params)
    end

  end

end
