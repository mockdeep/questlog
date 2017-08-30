class Tag < ApplicationRecord

  class Create

    include JunkDrawer::Callable

    def call(user:, **tag_params)
      user.tags.create!(tag_params)
    end

  end

end
