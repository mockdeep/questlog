module ContextsHelper
  def active_class(context)
    params[:context_id] == context.slug ? 'active' : ''
  end
end
