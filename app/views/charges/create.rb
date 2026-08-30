# frozen_string_literal: true

module Views
  module Charges
    class Create < Views::Base
      def view_template
        h2 do
          plain("Thanks, you paid ")
          strong { "$5.00" }
          plain("!")
        end
      end
    end
  end
end
