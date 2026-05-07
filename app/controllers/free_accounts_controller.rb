# frozen_string_literal: true

class FreeAccountsController < ApplicationController
  def new
    @account = FreeAccount.new
  end

  def create
    result = FreeAccount::Create.(account_params)
    return render_failure(result) unless result.success?

    persist_current_user
    current_user.update!(account: result.object)
    flash[:notice] = t(".success")
    redirect_to root_path
  end

  private

  def render_failure(result)
    @account = result.object
    flash.now[:error] = t(".error")
    render :new
  end

  def account_params
    params.expect(free_account: Array(permitted_params))
  end

  def permitted_params
    [:email, :password, :password_confirmation]
  end
end
