class SessionsController < ApplicationController

  def create
    result = Session::Create.(**session_params, current_user: current_user)
    if result.success?
      self.current_user = result.object
      return_or_redirect_to root_path, notice: 'Logged in!'
    else
      flash[:error] = 'Invalid email or password'
      redirect_to '/sessions/new'
    end
  end

  def destroy
    reset_session
    redirect_to root_path, notice: 'Logged out!'
  end

  private

  def session_params
    params.require(:session).permit(:email, :password).to_h.symbolize_keys
  end

end
