class DropModeColumn < ActiveRecord::Migration

  def up
    remove_column :users, :mode
  end

  def down
    add_column :users, :mode, :string, default: 'simple'
  end

end
