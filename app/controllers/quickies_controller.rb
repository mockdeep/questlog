class QuickiesController < ApplicationController

  after_filter :raise_unless_counters_match

  def index
    @quickies = current_user.quickies.undone
    @pending_quickies = current_user.quickies.pending
  end

  def show
    @quickie_form = QuickieForm.new(current_user)
    @quickie = current_user.next_quickie(params[:slug])
    @contexts = current_user.ordered_contexts.active
  end

  def create
    persist_current_user
    @quickie_form = QuickieForm.new(current_user)
    # title= depends on user being assigned first. This should be fixed.
    if @quickie_form.submit(quickie_params)
      redirect_to :back
    else
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

  def raise_unless_counters_match
    if current_user.persisted?
      count = current_user.reload.quickies.undone.count
      quickies_count = current_user.reload.quickies_count
      unless count == quickies_count
        # raise "counters broke: count -> #{count}, quickies_count -> #{quickies_count}"
      end
    end
  end

  def quickie_params
    params[:quickie].permit(
      :done,
      :skip,
      :title,
      :context_ids,
      :priority,
      :repeat_string,
      :time_estimate,
    )
  end

end
