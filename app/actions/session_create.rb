class SessionCreate

  include Callable

  def call(current_user:, email: nil, password: nil)
    profile = Profile.authenticate(email, password)
    if profile
      user = profile.user
      user.absorb(current_user) if current_user.persisted?
      OpenStruct.new(success?: true, object: user)
    else
      OpenStruct.new(success?: false, object: user)
    end
  end

end
