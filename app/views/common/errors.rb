# frozen_string_literal: true

module Views
  module Common
    class Errors < Views::Base
      def initialize(record:)
        @record = record
        super()
      end

      def view_template
        div(class: "error-messages") do
          h2 { "Invalid!" }
          ul do
            @record.errors.full_messages.each { |message| li { message } }
          end
        end
      end
    end
  end
end
