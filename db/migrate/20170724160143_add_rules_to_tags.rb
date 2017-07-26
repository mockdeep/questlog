class AddRulesToTags < ActiveRecord::Migration[5.1]

  def change
    add_column :tags, :rules, :jsonb, null: false, default: []
  end

end
