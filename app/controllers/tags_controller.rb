class TagsController < ApplicationController

  def index
    @tags = current_user.ordered_tags.active
    respond_to { |format| format.json }
  end

end
