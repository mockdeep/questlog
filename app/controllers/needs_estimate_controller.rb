class NeedsEstimateController < ApplicationController

  def show
    task = current_user.tasks.without_estimate.next

    respond_to do |format|
      format.json { render json: serialize(task, root: :task) }
    end
  end

end
