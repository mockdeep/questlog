class CreateQuickies < ActiveRecord::Migration
  def change
    create_table :quickies do |t|
      t.string :title

      t.timestamps
    end
    add_index :quickies, :updated_at
  end
end
