class CreateStats < ActiveRecord::Migration

  def change
    create_table :stats do |t|
      t.references :user, index: true, foreign_key: true, null: false
      t.integer :value, null: false
      t.datetime :timestamp, null: false
      t.timestamps null: false
    end
  end

end
