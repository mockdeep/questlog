class CreateQuickies < ActiveRecord::Migration
  def change
    create_table :quickies do |t|
      t.references :user
      t.string :title
      t.datetime :done_at

      t.timestamps
    end
    add_index :quickies, :updated_at
    add_index :quickies, :user_id
  end
end
