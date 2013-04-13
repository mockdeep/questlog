class CreateTags < ActiveRecord::Migration
  def change
    create_table :tags do |t|
      t.string :name
      t.integer :quickies_count, default: 0
      t.references :user

      t.timestamps
    end
    add_index :tags, :user_id
  end
end
