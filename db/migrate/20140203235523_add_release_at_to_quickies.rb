class AddReleaseAtToQuickies < ActiveRecord::Migration
  def change
    add_column :quickies, :release_at, :datetime
    add_index :quickies, :release_at
  end
end
