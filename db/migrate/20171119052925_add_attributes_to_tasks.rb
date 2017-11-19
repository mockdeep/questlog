class AddAttributesToTasks < ActiveRecord::Migration[5.1]

  def change
    add_column :tasks, :energy, :integer
    add_column :tasks, :fun, :integer
    add_column :tasks, :importance, :integer
    add_column :tasks, :urgency, :integer
  end

end
