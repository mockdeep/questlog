class AddIndices < ActiveRecord::Migration
  def change
    add_index :quickies, :done_at
    add_index :taggings, [:context_id, :quickie_id]
  end
end
