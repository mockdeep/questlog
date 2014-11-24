class AddModeToUsers < ActiveRecord::Migration

  def change
    add_column :users, :mode, :string, default: 'simple'
  end

end
