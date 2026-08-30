# frozen_string_literal: true

module Views
  module Sessions
    class New < Views::Base
      def view_template
        form_with(**form_options) do |form|
          h1 { "Log in" }
          field(form, :email) { form.text_field(:email) }
          field(form, :password) { form.password_field(:password) }
          p { form.submit("Login") }
        end
      end

      private

      def form_options
        { scope: :session, url: session_path, class: "login-form" }
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
