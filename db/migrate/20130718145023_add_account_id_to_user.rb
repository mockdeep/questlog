class AddAccountIdToUser < ActiveRecord::Migration

  def change
    add_column :users, :account_id, :integer
    add_column :users, :account_type, :string
    add_index :users, [:account_id, :account_type], unique: true
    add_index :users, :account_type
    add_index :users, :account_id
  end

end
