# frozen_string_literal: true

class AddRepeatSecondsToTasks < ActiveRecord::Migration
  def change
    add_column :tasks, :repeat_seconds, :integer
  end
end
