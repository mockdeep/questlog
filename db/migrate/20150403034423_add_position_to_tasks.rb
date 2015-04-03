class AddPositionToTasks < ActiveRecord::Migration

  def change
    add_column :tasks, :position, :integer, null: false, default: 0
    add_index :tasks, :position
    enable_extension 'intarray'
  end

end
