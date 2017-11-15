class RenameParentId < ActiveRecord::Migration[5.1]

  def change
    rename_column :tasks, :parent_id, :parent_task_id
  end

end
