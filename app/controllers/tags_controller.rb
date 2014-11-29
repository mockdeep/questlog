class TagsController < ApplicationController

  def index
    respond_to { |format| format.json { render json: selected_tags } }
  end

private

  def selected_tags
    [current_user] + current_user.ordered_tags.active
  end

end
