class ApplicationController < ActionController::Base

  protect_from_forgery

  before_filter :authenticate_user!

private

  def current_user
    @current_user ||= User.find(session[:user_id]) if session[:user_id]
  end
  helper_method :current_user

  def current_user=(user)
    session.clear
    session[:user_id] = user.id if user
  end
  helper_method :current_user=

  def authenticate_user!
    redirect_to new_session_path unless current_user
  end

end
