class CreateTaggings < ActiveRecord::Migration
  def change
    create_table :taggings do |t|
      t.references :context
      t.references :quickie

      t.timestamps
    end
    add_index :taggings, :context_id
    add_index :taggings, :quickie_id
  end
end
