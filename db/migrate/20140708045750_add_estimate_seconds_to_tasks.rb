# frozen_string_literal: true

class AddEstimateSecondsToTasks < ActiveRecord::Migration
  def change
    add_column :tasks, :estimate_seconds, :integer
  end
end
