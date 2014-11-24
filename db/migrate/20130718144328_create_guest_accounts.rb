class CreateGuestAccounts < ActiveRecord::Migration

  def change
    create_table :guest_accounts do |t|
      t.timestamps
    end
  end

end
