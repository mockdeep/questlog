class SessionsController < ApplicationController
  def new; end

  def create
    result = Session::Create.(**session_params, current_user:)
    if result.success?
      self.current_user = result.object
      return_or_redirect_to root_path, notice: "Logged in!"
    else
      flash[:error] = "Invalid email or password"
      redirect_to new_session_path
    end
  end

  def destroy
    reset_session
    redirect_to root_path, notice: "Logged out!"
  end

  private

  def session_params
    params.expect(session: [:email, :password]).to_h.symbolize_keys
  end
end
