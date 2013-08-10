class Profile

  def self.authenticate(email, password)
    FreeAccount.find_by_email(email).try(:authenticate, password)
  end

end
