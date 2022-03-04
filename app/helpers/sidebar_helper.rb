module SidebarHelper

  def sidebar_link_to(path, &)
    link_class = 'sidebar__link'
    link_class += ' sidebar__link--active' if current_page?(path)

    link_to(path, class: link_class, &)
  end

end
