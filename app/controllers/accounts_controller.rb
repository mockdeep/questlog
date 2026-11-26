# frozen_string_literal: true

class AccountsController < ApplicationController
  before_action :require_account

  def show
    render(Views::Accounts::Show.new(user: current_user))
  end

  def remove
    render(Views::Accounts::Remove.new(user: current_user))
  end

  def destroy
    current_user.destroy!
    reset_session
    redirect_to(root_path, notice: t(".success"))
  end

  private

  def require_account
    return unless current_user.guest?

    session[:return_path] = request.get? ? request.fullpath : account_path
    redirect_to(new_session_path)
  end
end
