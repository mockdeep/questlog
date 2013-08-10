class ContextsController < ApplicationController

  def create
    @context = Context.new(context_params)
    if @context.save
      redirect_to root_path
    else
      @new_quickie = Quickie.new
      @quickie = current_user.next_quickie
      @contexts = current_user.ordered_contexts
      render 'quickies/show'
    end
  end

private

  def context_params
    params[:context].permit(:name).merge(user: current_user)
  end

end
