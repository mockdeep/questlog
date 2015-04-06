class AddPositionToTasks < ActiveRecord::Migration

  def change
    add_column :tasks, :position, :integer
    add_index :tasks, :position
    enable_extension 'intarray'
  end

end
