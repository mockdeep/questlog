class SessionsController < ApplicationController

  def create
    profile = Profile.authenticate(params[:email], params[:password])
    if profile
      user = profile.user
      user.absorb(current_user) if current_user.persisted?
      self.current_user = user
      return_or_redirect_to root_path, notice: 'Logged in!'
    else
      flash[:error] = 'Invalid email or password'
      redirect_to '/sessions/new'
    end
  end

  def destroy
    session.clear
    redirect_to root_path, notice: 'Logged out!'
  end

end
