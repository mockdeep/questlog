# frozen_string_literal: true

class CreateGuestAccounts < ActiveRecord::Migration
  def change
    create_table(:guest_accounts, &:timestamps)
  end
end
