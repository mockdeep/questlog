# frozen_string_literal: true

class HelpController < ApplicationController
  def index
    render(Views::Help::Index.new)
  end
end
