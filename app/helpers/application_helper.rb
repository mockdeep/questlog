# frozen_string_literal: true

module ApplicationHelper

  def page_title
    content_for(:title) || params[:controller].titleize
  end

end
