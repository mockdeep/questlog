class SessionsController < ApplicationController

  skip_before_filter :authenticate_user!, only: [:new, :create]

  def new
  end

  def create
    if profile = Profile.authenticate(params[:email], params[:password])
      user = profile.user
      user.quickies += current_user.quickies
      self.current_user = profile.user
      redirect_to root_path, notice: 'Logged in!'
    else
      flash.now[:error] = 'Invalid email or password'
      render :new
    end
  end

  def destroy
    session.clear
    redirect_to root_path, notice: 'Logged out!'
  end

end
