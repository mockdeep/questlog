class RenameQuickiesToTasks < ActiveRecord::Migration

  def change
    rename_table :quickies, :tasks

    add_index :tasks, :done_at
    add_index :tasks, :priority
    add_index :tasks, :release_at
    add_index :tasks, :updated_at
    add_index :tasks, :user_id

    rename_column :taggings, :quickie_id, :task_id

    add_index :taggings, :task_id
    add_index :taggings, %i[context_id task_id], unique: true

    rename_column :users, :quickies_count, :tasks_count
    rename_column :contexts, :quickies_count, :tasks_count
  end

end
