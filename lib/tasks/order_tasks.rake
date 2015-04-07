namespace :oneoff do

  desc 'set task position based on priority and updated_at order'
  task order_tasks: :environment do
    TaskPositioner.new.position_tasks!
  end

end
