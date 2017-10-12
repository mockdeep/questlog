class Profile

  def self.authenticate(email, password)
    FreeAccount.find_by(email: email.downcase).try(:authenticate, password)
  end

end
