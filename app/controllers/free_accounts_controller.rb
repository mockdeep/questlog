class FreeAccountsController < ApplicationController

  def new
    @account = FreeAccount.new
  end

  def create
    @account = FreeAccount.new(account_params)
    if @account.save
      persist_current_user
      current_user.update!(account: @account)
      flash[:notice] = 'Signed up!'
      redirect_to root_path
    else
      flash.now[:error] = 'There was a problem creating your account...'
      render :new
    end
  end

private

  def account_params
    params.require(:free_account).permit(*permitted_params)
  end

  def permitted_params
    [:email, :password, :password_confirmation]
  end

end
