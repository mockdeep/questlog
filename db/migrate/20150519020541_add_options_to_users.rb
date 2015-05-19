class AddOptionsToUsers < ActiveRecord::Migration

  def change
    enable_extension 'hstore'
    add_column :users, :options, :hstore, null: false, default: {}
  end

end
