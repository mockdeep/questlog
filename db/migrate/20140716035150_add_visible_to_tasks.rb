class AddVisibleToTasks < ActiveRecord::Migration

  def change
    add_column :tasks, :visible, :boolean, default: true, null: false
    add_index :tasks, :visible
    add_index :tasks, [:user_id, :visible]
  end

end
