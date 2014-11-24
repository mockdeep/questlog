class AddPriorityToQuickies < ActiveRecord::Migration

  def change
    add_column :quickies, :priority, :integer
    add_index :quickies, :priority
  end

end
