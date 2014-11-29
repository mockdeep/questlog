class AddKeys < ActiveRecord::Migration

  def change
    add_foreign_key 'tags', 'users'
    add_foreign_key 'tasks', 'users'
  end

end
