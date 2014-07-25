class ApplicationController < ActionController::Base

  protect_from_forgery

  before_filter :authorize_profiler
  before_filter :check_repeats
  before_filter :check_counters
  after_filter :check_counters

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

  def check_counters
    return unless current_user.persisted?

    models = [current_user] + current_user.contexts
    models.each do |model|
      recorded_count = model.reload.tasks_count
      actual_count = model.tasks.undone.count
      unless recorded_count == actual_count
        fail "counter broke for #{model.class} #{current_user.id} -> " \
          "actual: #{actual_count}, recorded: #{recorded_count}"
      end
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
