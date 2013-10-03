class QuickiesController < ApplicationController

  def show
    @new_quickie = Quickie.new
    @quickie = current_user.next_quickie(params[:slug])
    @context = Context.new
    @contexts = current_user.ordered_contexts
  end

  def create
    persist_current_user
    @new_quickie = current_user.quickies.new(quickie_params)
    if @new_quickie.save
      redirect_to :back
    else
      @context = Context.new
      @contexts = current_user.ordered_contexts
      @quickie = current_user.quickies.undone.first
      render 'show'
    end
  end

  def update
    quickie = current_user.quickies.find(params[:id])
    quickie.update_attributes!(quickie_params)
    redirect_to :back
  end

  def destroy
    current_user.quickies.find(params[:id]).destroy
    redirect_to :back
  end

private

  def quickie_params
    params[:quickie].permit(
      :done,
      :skip,
      :title,
      :context_ids,
      :priority,
      :repeat_string,
      :time_estimate
    )
  end

end
