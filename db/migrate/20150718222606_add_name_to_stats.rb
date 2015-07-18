class AddNameToStats < ActiveRecord::Migration

  def change
    add_column :stats, :name, :string
    add_index :stats, :name
    Stat.update_all(name: 'seconds-completed')
    change_column_null :stats, :name, false
  end

end
