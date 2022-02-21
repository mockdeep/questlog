class PagesController < ApplicationController
  layout 'react', only: :index
  def index
    render html: '', layout: true
  end

  def what; end
end
