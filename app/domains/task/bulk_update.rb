class Task < ApplicationRecord
  class BulkUpdate
    include JunkDrawer::Callable

    def call(user:, positions:)
      user.tasks.reposition(positions.map(&method(:Integer)))
    end
  end
end
