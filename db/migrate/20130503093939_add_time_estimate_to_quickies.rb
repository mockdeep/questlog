# frozen_string_literal: true

class AddTimeEstimateToQuickies < ActiveRecord::Migration
  def change
    add_column :quickies, :time_estimate, :integer
  end
end
