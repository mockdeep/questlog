class FreeAccountsController < ApplicationController
  def new
    @account = FreeAccount.new
  end

  def create
    result = FreeAccount::Create.(account_params)
    if result.success?
      persist_current_user
      current_user.update!(account: result.object)
      flash[:notice] = 'Signed up!'
      redirect_to root_path
    else
      @account = result.object
      flash.now[:error] = 'There was a problem creating your account...'
      render :new
    end
  end

  private

  def account_params
    params.expect(free_account: Array(permitted_params))
  end

  def permitted_params
    [:email, :password, :password_confirmation]
  end
end
