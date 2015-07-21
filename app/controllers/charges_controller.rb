class ChargesController < ApplicationController

  CHARGE_AMOUNT = 500 # cents

  def new
    @stripe_data = {
      key: Rails.configuration.stripe[:publishable_key],
      description: 'Subscription',
      amount: 500,
    }
  end

  def create
    current_user.update!(customer_id: customer.id)
    create_charge
  rescue Stripe::CardError => e
    flash[:error] = e.message
    redirect_to charges_path
  end

private

  def customer
    @customer ||= Stripe::Customer.create(customer_params)
  end

  def customer_params
    { email: params[:stripeEmail], card: params[:stripeToken] }
  end

  def create_charge
    Stripe::Charge.create(charge_params)
  end

  def charge_params
    {
      customer: customer.id,
      amount: CHARGE_AMOUNT,
      description: 'Questlog account upgrade',
      currency: 'usd',
    }
  end

end
