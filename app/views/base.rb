# frozen_string_literal: true

module Views
  class Base < Phlex::HTML
    extend Phlex::Rails::HelperMacros

    include Phlex::Rails::Helpers::ButtonTo
    include Phlex::Rails::Helpers::CheckboxTag
    include Phlex::Rails::Helpers::ContentFor
    include Phlex::Rails::Helpers::FormWith
    include Phlex::Rails::Helpers::HiddenFieldTag
    include Phlex::Rails::Helpers::LinkTo
    include Phlex::Rails::Helpers::OptionsForSelect
    include Phlex::Rails::Helpers::Routes
    include Phlex::Rails::Helpers::SelectTag
    include Phlex::Rails::Helpers::TextAreaTag
    include Phlex::Rails::Helpers::TurboFrameTag
  end
end
