desc 're-count counters for tasks'

task fix_counters: :environment do
  Context.find_each do |context|
    undone_count = context.tasks.undone.count
    unless context.unfinished_tasks_count == undone_count
      puts "context #{context.name} was off: " \
        "set -> #{context.unfinished_tasks_count}, actual -> #{undone_count}"
      Context.readonly_attributes.delete('tasks_count')
      context.update_column(:unfinished_tasks_count, undone_count)
    end
  end
  Context.readonly_attributes << 'tasks_count'

  User.find_each do |user|
    undone_count = user.tasks.undone.count
    unless user.unfinished_tasks_count == undone_count
      puts "user #{user.email} was off: set -> " \
        "#{user.unfinished_tasks_count}, actual -> #{undone_count}"
      user.update_column(:unfinished_tasks_count, undone_count)
    end
  end

end
