class AddUniqueStatConstraint < ActiveRecord::Migration

  def change
    add_index :stats, %i[name user_id timestamp], unique: true
  end

end
