class RenameContextsToTags < ActiveRecord::Migration

  def up
    rename_column :taggings, :context_id, :tag_id
    remove_foreign_key :taggings, :contexts
    rename_table :contexts, :tags
    add_foreign_key :taggings, :tags
  end

  def down
    rename_column :taggings, :tag_id, :context_id
    remove_foreign_key :taggings, :tags
    rename_table :tags, :contexts
    add_foreign_key :taggings, :contexts
  end

end
