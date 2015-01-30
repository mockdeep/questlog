class UntaggedTasksController < ApplicationController

  def show
    @new_task = current_user.tasks.new
    @task = current_user.tasks.untagged.next

    respond_to do |format|
      format.html { render 'tasks/show' }
      format.json { render 'tasks/show' }
    end
  end

end
