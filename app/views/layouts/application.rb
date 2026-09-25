# frozen_string_literal: true

module Views
  module Layouts
    class Application < Views::Base
      include Phlex::Rails::Layout
      include Phlex::Rails::Helpers::Flash
      include Phlex::Rails::Helpers::MailTo

      register_value_helper :current_user
      register_value_helper :page_title

      VIEWPORT = "width=device-width, initial-scale=1.0"
      SIGN_UP_PROMPT =
        "You're not logged in! In order to save your tasks you'll need to"

      def view_template(&)
        doctype
        html do
          head { head_content }
          body(**body_options) { body_content(&) }
        end
      end

      private

      def head_content
        title { page_title }
        favicon_link_tag("favicon.ico")
        javascript_include_tag("crash_site_onerror") if Rails.env.test?
        stylesheet_link_tag("application", media: "all")
        csrf_meta_tags
        javascript_include_tag("application")
        meta(name: "viewport", content: VIEWPORT)
      end

      def body_options
        {
          data: {
            controller: "honeybadger",
            honeybadger_api_key_value: Honeybadger.config[:api_key],
            honeybadger_environment_value: Honeybadger.config[:env],
            honeybadger_user_id_value: current_user.id,
          },
        }
      end

      def body_content(&)
        clock if Rails.env.test?
        div(**container_options) do
          navbar
          flashes
          main(&)
          footer_links
        end
        turbo_frame_tag("dialog")
      end

      def clock
        div(class: "time-freeze", data: { timestamp: Time.now.to_i * 1000 })
        javascript_include_tag("freeze_time")
      end

      def container_options
        {
          class: "container content",
          data: {
            controller: "layout",
            action: "resize@window->layout#updateScreenSize",
          },
        }
      end

      def navbar
        row do
          div(class: "col-md-12 navbar") do
            div(class: "user-nav") { user_nav }
            h1(class: "brand") { link_to("QUESTLOG", root_path) }
            br
            link_to("How it works", "/what")
          end
        end
      end

      def user_nav
        return account_nav unless current_user.guest?

        plain(SIGN_UP_PROMPT)
        whitespace
        link_to("Sign up", new_free_account_path)
        whitespace
        plain("or")
        whitespace
        link_to("Log in", new_session_path)
      end

      def account_nav
        plain("Logged in as #{current_user.email}")
        br
        button_to("Log out", session_path, method: :delete)
      end

      def flashes
        row do
          div(class: "col-md-12 flashes", id: "flashes") do
            flash.each { |name, message| flash_message(name, message) }
          end
        end
      end

      def flash_message(name, message)
        div(class: "flash-#{name}", data: { controller: "flash" }) { message }
      end

      def main(&)
        row do
          div(class: "col-md-12") do
            render(Sidebar.new)
            yield
          end
        end
      end

      def footer_links
        div(class: "footer") { mail_to("robert@boon.gl", "Feedback") }
      end

      def row(&)
        div(class: "row", &)
      end
    end
  end
end
