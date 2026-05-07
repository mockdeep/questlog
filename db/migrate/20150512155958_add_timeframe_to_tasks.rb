# frozen_string_literal: true

class AddTimeframeToTasks < ActiveRecord::Migration
  def change
    add_column :tasks, :timeframe, :string
    add_index :tasks, :timeframe
  end
end
