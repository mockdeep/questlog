namespace :oneoff do

  desc 'set task position based on priority and updated_at order'
  task order_tasks: :environment do
    User.find_each do |user|
      Task.order(user.tasks.ordered.pluck(:id))
    end
  end

end
