class UntaggedTasksController < ApplicationController

  def show
    task = current_user.tasks.untagged.next

    respond_to do |format|
      format.json { render json: serialize(task) }
    end
  end

end
