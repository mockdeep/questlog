# frozen_string_literal: true

module Views
  module Accounts
    class Show < Views::Base
      attr_accessor :user

      def initialize(user:)
        super()
        self.user = user
      end

      def view_template
        h1 { "Account" }

        dl do
          dt { "Email" }
          dd { user.email }
          dt { "Plan" }
          dd { user.customer_id ? "Paid" : "Free" }
        end

        p { link_to("Delete account", remove_account_path) }
      end
    end
  end
end
