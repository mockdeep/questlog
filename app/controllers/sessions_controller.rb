class SessionsController < ApplicationController

  def new
  end

  def create
    profile = Profile.authenticate(params[:email], params[:password])
    if profile
      user = profile.user
      user.absorb(current_user) if current_user.persisted?
      self.current_user = user
      return_or_redirect_to root_path, notice: 'Logged in!'
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
