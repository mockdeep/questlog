desc 'Check repeats on tasks'
task check_repeats: :environment do
  # can't use update_all, since the done= method also updates counters
  Task.ready_to_release.each { |q| q.update_attributes!(done: false) }
end
