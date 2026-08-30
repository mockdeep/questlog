# frozen_string_literal: true

module Views
  module FreeAccounts
    class New < Views::Base
      def initialize(account:)
        @account = account
        super()
      end

      def view_template
        form_for(@account, html: { class: "sign-up-form" }) do |form|
          h1 { "Sign Up" }
          errors
          field(form, :email) { form.text_field(:email) }
          field(form, :password) { form.password_field(:password) }
          confirmation_field(form)
          p(class: "button") { form.submit("Create free account!") }
        end
      end

      private

      def errors
        return if @account.errors.none?

        render(Common::Errors.new(record: @account))
      end

      def confirmation_field(form)
        field(form, :password_confirmation) do
          form.password_field(:password_confirmation)
        end
      end

      def field(form, name)
        p do
          form.label(name)
          br
          yield
        end
      end
    end
  end
end
