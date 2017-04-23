class SessionCreate

  include JunkDrawer::Callable

  def call(current_user:, email: nil, password: nil)
    profile = Profile.authenticate(email, password)
    if profile
      user = profile.user
      user.absorb(current_user) if current_user.persisted?
      success = true
    else
      success = false
    end
    ActionResult.new(success: success, object: user)
  end

end
