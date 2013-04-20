module ContextsHelper

  def active_class(context)
    params[:slug] == context.slug ? 'active' : ''
  end

end
