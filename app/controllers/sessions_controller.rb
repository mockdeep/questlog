# frozen_string_literal: true

class SessionsController < ApplicationController
  def new; end

  def create
    result = Session::Create.(**session_params, current_user:)
    if result.success?
      self.current_user = result.object
      return_or_redirect_to root_path, notice: t(".success")
    else
      flash[:error] = t(".error")
      redirect_to new_session_path
    end
  end

  def destroy
    reset_session
    redirect_to root_path, notice: t(".success")
  end

  private

  def session_params
    params.expect(session: [:email, :password]).to_h.symbolize_keys
  end
end
