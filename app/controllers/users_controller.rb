class UsersController < ApplicationController
  skip_before_filter :authenticate_user!

  def new
    @user = User.new
  end

  def create
    @user = User.new(user_params)
    if @user.save
      flash[:notice] = 'Signed up!'
      self.current_user = @user
      redirect_to items_path
    else
      flash.now[:error] = 'There was a problem creating your account...'
      render :new
    end
  end

  private

  def user_params
    params[:user].permit(:email, :password, :password_confirmation)
  end
end
