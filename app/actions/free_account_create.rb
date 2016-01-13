class FreeAccountCreate

  include Callable

  def call(account_params)
    account = FreeAccount.new(account_params)
    ActionResult.new(success: account.save, object: account)
  end

end
