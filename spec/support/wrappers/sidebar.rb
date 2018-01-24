module Questlog

  module Wrappers

    class Sidebar

      include Capybara::DSL
      include RSpec::Matchers

      attr_accessor :element

      def initialize
        self.element = find('.sidebar')
      end

      def close
        expect(page).to have_link('ALL TASKS')
        element.find('.sidebar__toggle--visible').click
        expect(page).to have_no_link('ALL TASKS')
      end

      def open
        expect(page).to have_no_link('ALL TASKS')
        element.find('.sidebar__toggle--hidden').click
        expect(page).to have_link('ALL TASKS')
      end

      def click(link_text)
        open
        element.find('a', text: link_text).click
        close
      end

    end

  end

end
