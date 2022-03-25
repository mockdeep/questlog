# frozen_string_literal: true

module LinkHelper
  def active_link_to(name, path, **params, &)
    params[:class] += " #{params[:class]}--active" if current_page?(path)

    link_to(name, path, **params, &)
  end
end
