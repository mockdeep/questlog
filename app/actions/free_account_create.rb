class FreeAccountCreate

  include Callable

  def call(account_params)
    account = FreeAccount.new(account_params)
    if account.save
      OpenStruct.new(success?: true, object: account)
    else
      OpenStruct.new(success?: false, object: account)
    end
  end

end
