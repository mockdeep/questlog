# frozen_string_literal: true

module Views
  class Base < Phlex::HTML
    include Phlex::Rails::Helpers::Routes
  end
end
