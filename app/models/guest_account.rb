class GuestAccount < ApplicationRecord

  has_one :user, as: :account

  def guest?
    true
  end

end
