desc 're-count counters for tasks'

task fix_counters: :environment do
  Tag.find_each do |tag|
    undone_count = tag.tasks.undone.count
    unless tag.unfinished_tasks_count == undone_count
      puts "tag #{tag.name} was off: " \
        "set -> #{tag.unfinished_tasks_count}, actual -> #{undone_count}"
      Tag.readonly_attributes.delete('tasks_count')
      tag.update_column(:unfinished_tasks_count, undone_count)
    end
  end
  Tag.readonly_attributes << 'tasks_count'

  User.find_each do |user|
    undone_count = user.tasks.undone.count
    unless user.unfinished_tasks_count == undone_count
      puts "user #{user.email} was off: set -> " \
        "#{user.unfinished_tasks_count}, actual -> #{undone_count}"
      user.update_column(:unfinished_tasks_count, undone_count)
    end
  end

end
