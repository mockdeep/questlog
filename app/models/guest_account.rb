class GuestAccount < ApplicationRecord

  has_one :user, as: :account, inverse_of: :account

  def guest?
    true
  end

end
