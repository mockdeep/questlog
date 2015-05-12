class DropTimeframes < ActiveRecord::Migration

  def change
    reversible do |dir|
      dir.up { remove_foreign_key :tasks, :timeframes }
      dir.down { add_foreign_key :tasks, :timeframes }
    end
    remove_index :tasks, column: :timeframe_id
    remove_column :tasks, :timeframe_id, :integer
    drop_table :timeframes do |t|
      t.string :name
      t.timestamps null: false
    end
  end

end
