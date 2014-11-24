class CreateContexts < ActiveRecord::Migration

  def change
    create_table :contexts do |t|
      t.string :name
      t.integer :quickies_count, default: 0
      t.references :user

      t.timestamps
    end
    add_index :contexts, :user_id
  end

end
