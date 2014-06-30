class ApplicationController < ActionController::Base

  protect_from_forgery

  before_filter :authorize_profiler
  before_filter :check_repeats

private

  def current_user
    @current_user ||= find_user
  end
  helper_method :current_user

  def current_user=(user)
    session.clear
    session[:user_id] = user.id if user
  end
  helper_method :current_user=

  def persist_current_user
    if current_user.new_record?
      current_user.save!
      self.current_user = current_user
    end
  end

  def authorize_profiler
    Rack::MiniProfiler.authorize_request if current_user && current_user.admin?
  end

  def check_repeats
    if current_user.persisted?
      current_user.tasks.ready_to_release.each(&:release!)
    end
  end

  def find_user
    if session[:user_id]
      User.find(session[:user_id])
    else
      User.new(account: GuestAccount.new)
    end
  end

end
