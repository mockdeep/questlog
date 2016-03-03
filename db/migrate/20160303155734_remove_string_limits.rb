class RemoveStringLimits < ActiveRecord::Migration

  def up
    change_column :tasks, :title, :string, limit: nil
  end

  def down
    change_column :tasks, :title, :string, limit: 255
  end

end
