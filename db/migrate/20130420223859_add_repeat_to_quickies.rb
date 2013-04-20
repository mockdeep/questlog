class AddRepeatToQuickies < ActiveRecord::Migration
  def change
    add_column :quickies, :repeat_string, :string
  end
end
