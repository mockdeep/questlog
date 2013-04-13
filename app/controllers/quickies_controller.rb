class QuickiesController < ApplicationController
  def show
    @new_quickie = Quickie.new
    @quickie = current_user.quickies.undone.first
  end

  def create
    current_user.quickies.create!(quickie_params)
    redirect_to root_path
  end

  def update
    quickie = current_user.quickies.find(params[:id])
    quickie.update_attributes!(quickie_params)
    redirect_to root_path
  end

private

  def quickie_params
    params[:quickie].permit(:done, :skip, :title)
  end
end
