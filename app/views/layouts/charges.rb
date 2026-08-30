# frozen_string_literal: true

module Views
  module Layouts
    class Charges < Views::Base
      include Phlex::Rails::Layout

      def view_template(&)
        doctype
        html do
          head
          body(&)
        end
      end
    end
  end
end
