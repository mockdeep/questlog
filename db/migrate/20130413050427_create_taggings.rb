class CreateTaggings < ActiveRecord::Migration
  def change
    create_table :taggings do |t|
      t.references :tag
      t.references :quickie

      t.timestamps
    end
    add_index :taggings, :tag_id
    add_index :taggings, :quickie_id
  end
end
