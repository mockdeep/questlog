class CreateTimeframes < ActiveRecord::Migration
  def change
    create_table :timeframes do |t|
      t.string :name
      t.timestamps null: false
    end

    add_column :tasks, :timeframe_id, :integer
    add_index :tasks, :timeframe_id
    add_foreign_key :tasks, :timeframes
  end
end
