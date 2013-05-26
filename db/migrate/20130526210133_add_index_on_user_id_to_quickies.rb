class AddIndexOnUserIdToQuickies < ActiveRecord::Migration
  def change
    add_index :quickies, :user_id
  end
end
