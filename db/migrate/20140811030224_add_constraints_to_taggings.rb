class AddConstraintsToTaggings < ActiveRecord::Migration

  def up
    change_column :taggings, :task_id, :integer, null: false
    change_column :taggings, :context_id, :integer, null: false
    add_foreign_key :taggings, :tasks
    add_foreign_key :taggings, :contexts
  end

  def down
    change_column :taggings, :task_id, :integer, null: true
    change_column :taggings, :context_id, :integer, null: true
    remove_foreign_key :taggings, :tasks
    remove_foreign_key :taggings, :contexts
  end

end
