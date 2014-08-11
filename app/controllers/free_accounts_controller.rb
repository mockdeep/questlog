class FreeAccountsController < ApplicationController

  def new
    @account = FreeAccount.new
  end

  def create
    @account = FreeAccount.new(account_params)
    if @account.save
      current_user.update_attributes!(account: @account)
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
