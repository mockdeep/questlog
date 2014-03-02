class UsersController < ApplicationController

  def update
    current_user.update_attributes!(user_params)
    redirect_to root_path
  end

private

  def user_params
    params[:user].permit(:mode)
  end

end
