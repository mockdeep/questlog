module API

  module V1

    class TasksController < ApplicationController

      def index
        tasks = current_user.undone_and_pending_tasks
        render json: serialize(tasks, included: current_user.tags.ordered)
      end

    end

  end

end
