class AddQuickiesCountToUsers < ActiveRecord::Migration
  def change
    add_column :users, :quickies_count, :integer, default: 0
  end
end
