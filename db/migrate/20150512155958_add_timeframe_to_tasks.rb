class AddTimeframeToTasks < ActiveRecord::Migration

  def change
    add_column :tasks, :timeframe, :string
    add_index :tasks, :timeframe
  end

end
