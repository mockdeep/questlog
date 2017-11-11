class AddParentIdToTasks < ActiveRecord::Migration[5.1]

  def change
    add_column :tasks, :parent_id, :integer
    add_foreign_key :tasks, :tasks, column: :parent_id
    add_index :tasks, :parent_id
  end

end
