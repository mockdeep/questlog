class Task < ActiveRecord::Base

  class Destroy

    include JunkDrawer::Callable

    def call(task)
      task.destroy
    end

  end

end
