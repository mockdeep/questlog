class NullFalsePositions < ActiveRecord::Migration

  def change
    TaskPositioner.new.position_tasks!
    change_column_null :tasks, :position, false
    add_index :tasks, :position
    add_index :tasks, [:priority, :position]
  end

end
