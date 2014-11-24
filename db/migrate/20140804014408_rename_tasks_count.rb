class RenameTasksCount < ActiveRecord::Migration

  def up
    rename_column :users, :tasks_count, :unfinished_tasks_count
    rename_column :contexts, :tasks_count, :unfinished_tasks_count
  end

  def down
    rename_column :users, :unfinished_tasks_count, :tasks_count
    rename_column :contexts, :unfinished_tasks_count, :tasks_count
  end

end
