class AddSkipCountToQuickies < ActiveRecord::Migration
  def change
    add_column :quickies, :skip_count, :integer, default: 0
  end
end
