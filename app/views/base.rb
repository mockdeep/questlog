# frozen_string_literal: true

module Views
  class Base < Phlex::HTML
    extend Phlex::Rails::HelperMacros

    include Phlex::Rails::Helpers::Routes
  end
end
