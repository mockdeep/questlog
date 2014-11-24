class AddSlugToContexts < ActiveRecord::Migration

  def change
    add_column :contexts, :slug, :string
    add_index :contexts, :slug
  end

end
