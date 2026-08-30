# frozen_string_literal: true

module Views
  module Charges
    class New < Views::Base
      CHECKOUT = "https://checkout.stripe.com/checkout.js"

      def initialize(stripe_data:)
        @stripe_data = stripe_data
        super()
      end

      def view_template
        form_tag(charges_path) do
          article { label(class: "amount") { span { "Amount: $5.00" } } }
          script(class: "stripe-button", src: CHECKOUT, data: @stripe_data)
        end
      end
    end
  end
end
