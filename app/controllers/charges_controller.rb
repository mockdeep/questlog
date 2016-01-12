class ChargesController < ApplicationController

  def new
    @stripe_data = {
      key: Rails.configuration.stripe[:publishable_key],
      description: 'Subscription',
      amount: 500,
    }
  end

  def create
    result = ChargeCreate.(charge_params)

    return if result.success?

    flash[:error] = result.error_message
    redirect_to charges_path
  end

private

  def charge_params
    {
      email: params[:stripeEmail],
      token: params[:stripeToken],
      user: current_user,
    }
  end

end
