class RemoveIndices < ActiveRecord::Migration
  def up
    remove_index :quickies, :done_at
    remove_index :quickies, :priority
    remove_index :quickies, :release_at
    remove_index :quickies, :updated_at
    remove_index :quickies, :user_id

    remove_index :taggings, :quickie_id
    remove_index :taggings, [:context_id, :quickie_id]
  end

  def down
    add_index :quickies, :done_at
    add_index :quickies, :priority
    add_index :quickies, :release_at
    add_index :quickies, :updated_at
    add_index :quickies, :user_id

    add_index :taggings, :quickie_id
    add_index :taggings, [:context_id, :quickie_id]
  end
end
