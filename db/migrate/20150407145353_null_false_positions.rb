class NullFalsePositions < ActiveRecord::Migration

  def change
    change_column_null :tasks, :position, false
    add_index :tasks, %i[priority position]
  end

end
