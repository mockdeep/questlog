class CreateFreeAccounts < ActiveRecord::Migration
  def change
    create_table :free_accounts do |t|
      t.string :email, null: false
      t.string :password_digest, null: false

      t.timestamps
    end
    add_index :free_accounts, :email, :unique => true
  end
end
