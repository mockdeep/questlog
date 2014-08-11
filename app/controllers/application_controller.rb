class ApplicationController < ActionController::Base

  protect_from_forgery

  before_filter :authorize_profiler
  before_filter :check_repeats
  around_filter :check_counters

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
    return unless current_user.new_record?

    current_user.save!
    self.current_user = current_user
  end

  def authorize_profiler
    Rack::MiniProfiler.authorize_request if current_user && current_user.admin?
  end

  def check_repeats
    return unless current_user.persisted?
    current_user.tasks.ready_to_release.each(&:release!)
  end

  def check_counters
    fail_unless_counters_match('before')
    yield
    fail_unless_counters_match('after')
  end

  def fail_unless_counters_match(time_order)
    return unless current_user.persisted?

    models = [current_user] + current_user.contexts
    models.each do |model|
      recorded_count = model.reload.unfinished_tasks_count
      actual_count = model.tasks.undone.count

      next if recorded_count == actual_count

      fail "counter broke #{time_order} action for #{model.class} " \
        "#{current_user.id} -> actual: #{actual_count}, " \
        "recorded: #{recorded_count}"
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
