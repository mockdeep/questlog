# frozen_string_literal: true

module Views
  module Pages
    class Privacy < Views::Base
      def view_template
        p { "We won't sell your data." }
        p { "We will use your data to make Questlog better." }
      end
    end
  end
end
