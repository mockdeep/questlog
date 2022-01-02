class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception

  before_action :configure_headers
  before_action :check_repeats
  before_action :set_gon_variables
  before_action :set_honeybadger_context

private

  include Serializable::Helpers

  def configure_headers
    response.headers['Vary'] = 'Accept'
  end

  def current_user
    @current_user ||= find_user
  end
  helper_method :current_user

  def current_user=(user)
    return_path = session[:return_path]
    reset_session
    session[:return_path] = return_path
    session[:user_id] = user.id if user
  end
  helper_method :current_user=

  def persist_current_user
    return unless current_user.new_record?

    current_user.save!
    self.current_user = current_user
  end

  def check_repeats
    return unless current_user.persisted?

    current_user.tasks.ready_to_release.order(:release_at).each(&:release!)
  end

  def set_gon_variables
    gon.push(
      honeybadger_api_key: ENV['HONEYBADGER_API_KEY'],
      rails_env: Rails.env,
      user_id: current_user.id,
    )
  end

  def set_honeybadger_context
    Honeybadger.context(user_id: current_user.id, email: current_user.email)
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
end
