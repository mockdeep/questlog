class GuestAccount < ActiveRecord::Base

  has_one :user, as: :account

  def guest?
    true
  end

end
