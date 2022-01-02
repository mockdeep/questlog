module Charge

  class Create
    include JunkDrawer::Callable

    CHARGE_AMOUNT = 500 # cents

    def call(user:, email:, token:)
      customer = create_customer(email: email, token: token)
      user.update!(customer_id: customer.id)
      create_charge(customer: customer)
      ActionResult.new(success: true)
    rescue Stripe::CardError => e
      ActionResult.new(success: false, errors: [e.message])
    end

  private

    def create_charge(customer:)
      Stripe::Charge.create(
        customer: customer.id,
        amount: CHARGE_AMOUNT,
        description: 'Questlog account upgrade',
        currency: 'usd',
      )
    end

    def create_customer(email:, token:)
      Stripe::Customer.create(email: email, card: token)
    end
  end

end
