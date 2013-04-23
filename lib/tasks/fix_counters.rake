desc 're-count counters for quickies'
task fix_counters: :environment do
  Context.find_each do |context|
    context.update_attributes(quickies_count: context.quickies.undone.count)
  end

  User.find_each do |user|
    user.update_attributes(quickies_count: user.quickies.undone.count)
  end
end
