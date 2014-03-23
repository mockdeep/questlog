desc 're-count counters for quickies'

task fix_counters: :environment do
  Context.find_each do |context|
    undone_count = context.quickies.undone.count
    unless context.quickies_count == undone_count
      puts "context #{context.name} was off: " \
        "set -> #{context.quickies_count}, actual -> #{undone_count}"
      context.update_attributes(quickies_count: undone_count)
    end
  end

  User.find_each do |user|
    undone_count = user.quickies.undone.count
    unless user.quickies_count == undone_count
      puts "user #{user.email} was off: set -> #{user.quickies_count}, " \
        "actual -> #{undone_count}"
      user.update_attributes(quickies_count: undone_count)
    end
  end

end
