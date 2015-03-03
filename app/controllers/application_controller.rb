class ApplicationController < ActionController::Base

  protect_from_forgery

  before_action :authorize_profiler
  before_action :check_repeats

private

  def current_user
    @current_user ||= find_user
  end
  helper_method :current_user

  def current_user=(user)
    return_path = session[:return_path]
    session.clear
    session[:return_path] = return_path
    session[:user_id] = user.id if user
  end
  helper_method :current_user=

  def persist_current_user
    return unless current_user.new_record?

    current_user.save!
    self.current_user = current_user
  end

  def authorize_profiler
    Rack::MiniProfiler.authorize_request if current_user && current_user.admin?
  end

  def check_repeats
    return unless current_user.persisted?
    current_user.tasks.ready_to_release.order(:release_at).each(&:release!)
  end

  def find_user
    if session[:user_id]
      User.find(session[:user_id])
    else
      User.new(account: GuestAccount.new)
    end
  end

  def return_or_redirect_to(fallback_path, options)
    redirect_to(session.delete(:return_path) || fallback_path, options)
  end

  def store_return_path
    session[:return_path] = request.fullpath
  end

  def login_first
    store_return_path
    flash[:notice] = 'Please login first'
    redirect_to '/sessions/new'
  end

end
