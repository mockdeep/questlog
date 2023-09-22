module Questlog

  module Wrappers

    class Sidebar
      include Capybara::DSL
      include RSpec::Matchers

      attr_accessor :element

      def initialize
        self.element = find('.sidebar')
      end

      def click(link_text)
        click_link(link_text)
        expect(page).to have_css('.sidebar__link--active', text: link_text)
      end
    end

  end

end
